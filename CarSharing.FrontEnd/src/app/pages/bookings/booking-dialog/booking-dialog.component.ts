import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Booking, CreateBooking, UpdateBooking } from "../../../models/reservation";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CarService } from "../../../services/car.service";
import { Car } from "../../../models/car";
import { ClientService } from "../../../services/client.service";
import { Client } from "../../../models/customer";
import { Fine } from "../../../models/fine";
import { FineService } from "../../../services/fine.service";
import moment from "moment";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";
import { actualDateStartDateValidator, expectedDateStartDateValidator, maxDateValidator, startDateExpectedDateValidator, startDateReturnDateValidator } from "./custom-validators/date-validators";

@Component({
    templateUrl: 'booking-dialog.component.html',
    styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit, AfterViewInit  {
    booking: Booking = new Booking();
    form: FormGroup = this._fb.group({});
    cars: Car[] = [];
    clients: Client[] = [];
    fines: Fine[] = [];

    compareCars(c1: Car, c2: Car): boolean {
        return c1.id == c2.id;
    }

    compareCustomers(c1: Client, c2: Client): boolean {
        return c1.id == c2.id;
    }

    compareFines(f1: Fine, f2: Fine): boolean {
        return f1.id == f2.id;
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private finesService: FineService,
        private carsService: CarService,
        private _matDialog: MatDialog,
        private clientService: ClientService,
        private _matDialogRef: MatDialogRef<BookingDialogComponent>,
        private _fb: FormBuilder,
        private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.booking = this.data.booking;
        this.form = this.createForm();

        this.carsService.getAllCars().subscribe((cars: Car[]) => { 
            this.cars = cars.filter(c => !c.isInUse);
            if (this.booking.id) {
                this.cars.push(this.booking.car);
            }
        });
        this.clientService.getAllClients().subscribe((clients: Client[]) => this.clients = clients);

        if (this.booking.id) {
            this.finesService.getAllFines().subscribe((fines: Fine[]) => this.fines = fines);
        }

        if (this.booking.id && this.booking.actualReturnDate) {
            this.form.disable();
        }
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.booking.id || 0],
            startDate: [this.booking.startDate, [Validators.required, 
                startDateExpectedDateValidator(), startDateReturnDateValidator()]],
            expectedReturnDate: [this.booking.expectedReturnDate, 
                [Validators.required, expectedDateStartDateValidator()]],
            actualReturnDate: [this.booking.actualReturnDate, 
               [maxDateValidator(), actualDateStartDateValidator()]],
            customer: [this.booking.customer, [Validators.required]],
            car: [this.booking.car, Validators.required],
            totalSum: [this.booking.totalSum],

            fines: [this.booking.fines]
        });
    }

   onSave(): void {
    if (this.booking.id) {
        this.updateBooking();
    } else {
        this.createBooking();
        this._matDialogRef.close();
    }
   }

   private updateBooking(): void {
    const formValue = this.form.value as Booking;  
    if (formValue.actualReturnDate) {
        const dialogRef = this._matDialog.open(WarningDialogComponent, {
            disableClose: true,
            width: '400px'
        });
        dialogRef.componentInstance.message = 'Ви впевнені, що хочете підтвердити повернення машини? Після натискання кнопки ви не зможете більше відредагувати бронювання.'; 
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const booking: UpdateBooking = this.createBookingForUpdate();
                this.data.updateBooking(booking);
                this._matDialogRef.close();
            }
        })
    }  
    else if (formValue.fines.length > 0){
        const dialogRef = this._matDialog.open(WarningDialogComponent, {
            disableClose: true,
            width: '400px'
        });
        dialogRef.componentInstance.message = 'Ви впевнені, що хочете зберегти форму без Дати повернення? Усі наявні штрафи будут стерті.'; 
        dialogRef.afterClosed().subscribe((res: boolean) => {
            if (res) {
                const booking: UpdateBooking = this.createBookingForUpdate(false);
                this.data.updateBooking(booking);
                this._matDialogRef.close();
            }
        })
    } else {
        const booking: UpdateBooking = this.createBookingForUpdate();
        this.data.updateBooking(booking);
        this._matDialogRef.close();
    }
   }

   createBookingForUpdate(addFines: boolean = true): UpdateBooking {
    const formValue = this.form.value as Booking;  
    const booking: UpdateBooking = {
        id: formValue.id,
        customerId: formValue.customer.id,
        carId: formValue.car.id,
        expectedReturnDate: moment(formValue.expectedReturnDate).format('YYYY-MM-DD'),
        startDate: moment(formValue.startDate).format('YYYY-MM-DD'),
        actualReturnDate: moment(formValue.actualReturnDate).format('YYYY-MM-DD'),
        fineIds: addFines ? formValue.fines.map(f => f.id): []
    } as UpdateBooking;

    return booking;
   }

   private createBooking(): void {
    const formValue = this.form.value;
    const booking: CreateBooking = {
        customerId: formValue.customer.id,
        carId: formValue.car.id,
        expectedReturnDate: moment(formValue.expectedReturnDate).format('YYYY-MM-DD'),
        startDate: moment(formValue.startDate).format('YYYY-MM-DD')
    }  as CreateBooking; 
    this.data.createBooking(booking);
   }

   onDelete(): void {
    const dialogRef = this._matDialog.open(WarningDialogComponent, {
        disableClose: true,
        width: '400px'
    });
    dialogRef.componentInstance.message = 'Ви впевнені, що хочете видалити бронювання? Після підтвердження відмінити цю дію буде неможливо.'; 
    dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
            this.data.deleteBooking(this.booking.id);
            this._matDialogRef.close();
        }
    })
   }

   getTotalSum(applyDiscount: boolean = true): number {
    const reservation = this.form.value;
    if (this.allChosen()) {
            const discount = reservation.customer.isRegular && 
                (this.booking.createdAt >= reservation.customer.isRegularForm) && applyDiscount ? 0.95 : 1;
            const totalDays = 
                Math.ceil((new Date(reservation.expectedReturnDate).getTime() - new Date(reservation.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
           
            let finesSum = 0;
        
            for (const fine of reservation.fines) {
                finesSum += fine.price;
            }
        
            if (reservation.actualReturnDate) {
                if (new Date(reservation.actualReturnDate) < new Date(reservation.expectedReturnDate)) {
                    const actualDays = 
                        Math.ceil((new Date(reservation.actualReturnDate).getTime() - new Date(reservation.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
                        return Number(((reservation.car.dailyRentalPrice * actualDays + finesSum) * discount).toFixed(2));
                } else {
                    const extraDays = Math.max(
                        0,
                        Math.ceil((new Date(reservation.actualReturnDate).getTime() - new Date(reservation.expectedReturnDate).getTime()) / (1000 * 60 * 60 * 24))
                    );
                    finesSum += extraDays * reservation.car.dailyRentalPrice * 1.05;
                }
            }
        
        return Number(((reservation.car.dailyRentalPrice * totalDays + finesSum) * discount).toFixed(2));
    }
    else {
        return 0;
    } 
   }

   getOverdueDays(): number {
    if (this.allChosen()){
        const formValue = this.form.value;
        const differenceMs = new Date(formValue.expectedReturnDate).getTime() - new Date(formValue.actualReturnDate).getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    
        if (differenceDays < 0) {
            return Math.abs(differenceDays);
        }
    }
    return 0;
   }

   hasOverDue(): boolean {
    if (this.allChosen()){
        const formValue = this.form.value;
        const differenceMs = new Date(formValue.expectedReturnDate).getTime() - new Date(formValue.actualReturnDate).getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

        if (differenceDays < 0) {
            return true;
        }
    }
    return false;
   }

   getCountOfFineForOverdueDays(): number {
    if (this.allChosen()){
        const formValue = this.form.value;
        const differenceMs = new Date(formValue.expectedReturnDate).getTime() - new Date(formValue.actualReturnDate).getTime();
        const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    
        if (differenceDays < 0) {
            return Math.abs(differenceDays * formValue.car.dailyRentalPrice * 1.05);
        }
    }
    return 0;
   }

   allChosen(): boolean {
    const formValue = this.form.value;
    return formValue.customer && formValue.car 
        && formValue.startDate && formValue.expectedReturnDate
   }
}
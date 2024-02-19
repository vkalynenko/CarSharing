import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { Booking, CreateBooking } from "../../../models/reservation";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CarService } from "../../../services/car.service";
import { Car } from "../../../models/car";
import { ClientService } from "../../../services/client.service";
import { Client } from "../../../models/customer";
import { Fine } from "../../../models/fine";
import { FineService } from "../../../services/fine.service";
import moment from "moment";
import { WarningDialogModule } from "../../warning-dialog/warning-dialog.module";
import { WarningDialogComponent } from "../../warning-dialog/warning-dialog.component";

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

    compareCars(c1: Car, c2: Car) {
        if(c1.id == c2.id)
            return true; 
        else return false
    }

    compareCustomers(c1: Client, c2: Client) {
        if(c1.id == c2.id)
            return true; 
        else return false
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
    }

    ngAfterViewInit() {
        this.cdr.detectChanges();
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.booking.id || 0],
            startDate: [this.booking.startDate, Validators.required],
            expectedReturnDate: [this.booking.expectedReturnDate, Validators.required],
            actualReturnDate: [this.booking.actualReturnDate],
            customer: [this.booking.customer, Validators.required],
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
    }
    this._matDialogRef.close();
   }

   private updateBooking(): void {
    const formValue = this.form.value as Booking;  
    if (formValue.actualReturnDate) {
        // const dialogRef = this._matDialog.open(WarningDialogComponent, {
        //     disableClose: true,
        //     width: '400px'
        // });
        // dialogRef.componentInstance.message = 'Ви впевнені, що хочете підтвердити повернення машини? Після натискання кнопки ви не зможете більше відредагувати бронювання.'; 
        // dialogRef.afterClosed().subscribe((res: boolean) => {
        //     if (res) {

        //     }
        // })
    }  
    else if (formValue.fines.length > 0){
        // const dialogRef = this._matDialog.open(WarningDialogComponent, {
        //     disableClose: true,
        //     width: '400px'
        // });
        // dialogRef.componentInstance.message = 'Ви впевнені, що хочете зберегти форму без Дати повернення? Усі наявні штрафи будут стерті.'; 
        // dialogRef.afterClosed().subscribe((res: boolean) => {
        //     if (res) {

        //     }
        // })
    }
   // this.data.updateBooking(formValue);
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
    this.data.deleteBooking(this.booking.id);
    this._matDialogRef.close();
   }

   getTotalSum(applyDiscount: boolean = true): number {
    const formValue = this.form.value;
    if (this.allChosen()) {
            const discount = formValue.customer.isRegular && applyDiscount ? 0.95 : 1;
        const targetDate = formValue.actualReturnDate ?? formValue.expectedReturnDate;
        const totalDays = Math.ceil((new Date(targetDate).getTime() - new Date(formValue.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1;
        let finesSum = 0;
        for (const fine of formValue.fines) {
            finesSum += fine.Price;
        }
        return (formValue.car.dailyRentalPrice * totalDays + finesSum) * discount;
    }
    else {
        return 0;
    } 
   }

   allChosen(): boolean {
    const formValue = this.form.value;
    return formValue.customer && formValue.car 
        && formValue.startDate && formValue.expectedReturnDate
   }
}
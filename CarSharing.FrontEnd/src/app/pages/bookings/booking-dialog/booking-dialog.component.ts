import { Component, Inject, OnInit } from "@angular/core";
import { Booking } from "../../../models/reservation";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CarService } from "../../../services/car.service";
import { Car } from "../../../models/car";
import { ClientService } from "../../../services/client.service";
import { Client } from "../../../models/customer";
import { Fine } from "../../../models/fine";
import { FineService } from "../../../services/fine.service";

@Component({
    templateUrl: 'booking-dialog.component.html',
    styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit{
    booking: Booking = new Booking();
    form: FormGroup = this._fb.group({});
    cars: Car[] = [];
    clients: Client[] = [];
    fines: Fine[] = [];

    displayCar(car?: Car): string | null {
        return car ? `${car.brand} ${car.model}` : null;
    }

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
        private finesService: FineService,
        private carsService: CarService,
        private clientService: ClientService,
        private _matDialogRef: MatDialogRef<BookingDialogComponent>,
        private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.booking = this.data.booking;
        this.form = this.createForm();

        this.carsService.getAllCars().subscribe((cars: Car[]) => this.cars = cars);
        this.clientService.getAllClients().subscribe((clients: Client[]) => this.clients = clients);

        if (this.booking.id) {
            this.finesService.getAllFines().subscribe((fines: Fine[]) => this.fines = fines);
        }
    }

    private createForm(): FormGroup {
        return this._fb.group({
            id: [this.booking.id || 0],
            startDate: [this.booking.startDate || new Date(), Validators.required],
            expectedReturnDate: [this.booking.expectedReturnDate 
                || new Date().setDate(new Date().getDate() + 1), Validators.required],
            actualReturnDate: [this.booking.actualReturnDate],
            customer: [this.booking.customer, Validators.required],
            car: [this.booking.customer, Validators.required],
            totalSum: [this.booking.totalSum],

            fines: [this.booking.fines]
        });
    }

   onSave(): void {
    if (this.booking.id) {
        this.updateBooking();
    }else {
        this.createBooking();
    }
    this._matDialogRef.close();
   }

   private updateBooking(): void {
    const formValue = this.form.value as Booking;    
    this.data.updateBooking(formValue);
   }

   private createBooking(): void {
    const formValue = this.form.value as Booking;    
    this.data.createBooking(formValue);
   }

   onDelete(): void {
    this.data.deleteBooking(this.booking.id);
    this._matDialogRef.close();
   }
}
import { Car } from "./car";
import { Client } from "./customer";
import { Fine } from "./fine";

export class Booking {
    public id!: number;
    public customer!: Client;
    public car!: Car;

    public startDate!: Date;
    public expectedReturnDate!: Date;
    public actualReturnDate?: Date;

    public totalSum!: number;

    public fines: Fine[] = [];
}

export class CreateBooking {
    public startDate!: string;
    public expectedReturnDate!: string;

    public customerId!: number;
    public carId!: number;
}

export class UpdateBooking extends CreateBooking{
    public actualReturnDate!: string;
    public fineIds: number[] = [];
}
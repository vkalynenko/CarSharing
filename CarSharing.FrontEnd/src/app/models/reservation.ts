import { Car } from "./car";
import { Customer } from "./customer";
import { Fine } from "./fine";

export class Reservation {
    public id!: number;
    public customer!: Customer;
    public car!: Car;

    public startDate!: Date;
    public expectedReturnDate!: Date;
    public actualReturnDate?: Date;

    public totalSum!: number;

    public fines: Fine[] = [];
}
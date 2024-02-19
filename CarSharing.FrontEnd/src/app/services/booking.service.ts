import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "../../environments/environments";
import { Booking } from "../models/reservation";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private http: HttpClient) {}
    
    public getAllBookings(): Observable<Booking[]> {
       return this.http.get<Booking[]>(`${environments.apiUrl}/booking`);
    }

    public getBookingById(id: number): Observable<Booking> {
        return this.http.get<Booking>(`${environments.apiUrl}/booking/${id}`);
    }

    public createBooking(car: Booking): Observable<number> {
        return this.http.post<number>(`${environments.apiUrl}/booking`, car);
    }

    public updateBooking(car: Booking): Observable<void> {
        return this.http.put<void>(`${environments.apiUrl}/booking`, car);
    }

    public deleteBooking(id: number): Observable<void> {
        return this.http.delete<void>(`${environments.apiUrl}/booking/${id}`,);
    }
}
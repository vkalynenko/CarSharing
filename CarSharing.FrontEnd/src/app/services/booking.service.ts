import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environments } from "../../environments/environments";
import { Booking, CreateBooking } from "../models/reservation";

@Injectable({
    providedIn: 'root'
})
export class BookingService {
    constructor(private http: HttpClient) {}
    
    public getAllBookings(): Observable<Booking[]> {
       return this.http.get<Booking[]>(`${environments.apiUrl}/reservation`);
    }

    public getBookingById(id: number): Observable<Booking> {
        return this.http.get<Booking>(`${environments.apiUrl}/reservation/${id}`);
    }

    public createBooking(booking: CreateBooking): Observable<number> {
        return this.http.post<number>(`${environments.apiUrl}/reservation`, booking);
    }

    public updateBooking(booking: Booking): Observable<void> {
        return this.http.put<void>(`${environments.apiUrl}/reservation`, booking);
    }

    public deleteBooking(id: number): Observable<void> {
        return this.http.delete<void>(`${environments.apiUrl}/reservation/${id}`,);
    }
}
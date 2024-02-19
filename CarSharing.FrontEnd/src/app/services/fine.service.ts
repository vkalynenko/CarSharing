import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environments } from "../../environments/environments";
import { Fine } from "../models/fine";

@Injectable({
    providedIn: 'root'
})
export class FineService {
    constructor(private http: HttpClient) {}
    
    public getAllFines(): Observable<Fine[]> {
       return this.http.get<Fine[]>(`${environments.apiUrl}/fine`);
    }

    public getFineById(id: number): Observable<Fine> {
        return this.http.get<Fine>(`${environments.apiUrl}/fine/${id}`);
    }

    public createFine(car: Fine): Observable<number> {
        return this.http.post<number>(`${environments.apiUrl}/fine`, car);
    }

    public updateFine(car: Fine): Observable<void> {
        return this.http.put<void>(`${environments.apiUrl}/fine`, car);
    }

    public deleteFine(id: number): Observable<void> {
        return this.http.delete<void>(`${environments.apiUrl}/fine/${id}`,);
    }
}
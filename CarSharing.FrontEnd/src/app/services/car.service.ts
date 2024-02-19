import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Car } from "../models/car";
import { environments } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class CarService {
    constructor(private http: HttpClient) {}
    
    public getAllCars(): Observable<Car[]> {
       return this.http.get<Car[]>(`${environments.apiUrl}/car`);
    }

    public getCarById(id: number): Observable<Car> {
        return this.http.get<Car>(`${environments.apiUrl}/Car/${id}`);
    }

    public createCar(car: Car): Observable<number> {
        return this.http.post<number>(`${environments.apiUrl}/Car`, car);
    }

    public updateCar(car: Car): Observable<void> {
        return this.http.put<void>(`${environments.apiUrl}/Car`, car);
    }

    public deleteCar(id: number): Observable<void> {
        return this.http.delete<void>(`${environments.apiUrl}/Car/${id}`,);
    }
}
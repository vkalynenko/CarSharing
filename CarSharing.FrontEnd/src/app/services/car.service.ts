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
        const fakeCars: Car[] = [
            { 
                id: 1,
                brand: 'Toyota', 
                model: 'Camry', 
                releaseYear: 2020, 
                gearBox: 'Automatic', 
                seatsQuantity: 5, 
                dailyRentalPrice: 50, 
                isInUse: true
            },
            { 
                id: 2,
                brand: 'Honda', 
                model: 'Civic', 
                releaseYear: 2019, 
                gearBox: 'Manual', 
                seatsQuantity: 5, 
                dailyRentalPrice: 45, 
            },
            { 
                id: 3,
                brand: 'Ford', 
                model: 'Fusion', 
                releaseYear: 2018, 
                gearBox: 'Automatic', 
                seatsQuantity: 5,
                dailyRentalPrice: 48, 
            }
            // Add more car models as needed
        ];
        return of(fakeCars);
       // return this.http.get<Car[]>(`${environments.apiUrl}/Car`);
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
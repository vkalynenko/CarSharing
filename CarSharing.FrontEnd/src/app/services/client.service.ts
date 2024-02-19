import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environments } from "../../environments/environments";
import { Client } from "../models/customer";

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    constructor(private http: HttpClient) {}
    
    public getAllClients(): Observable<Client[]> {
       return this.http.get<Client[]>(`${environments.apiUrl}/customer`);
    }

    public getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${environments.apiUrl}/customer/${id}`);
    }

    public createClient(car: Client): Observable<number> {
        return this.http.post<number>(`${environments.apiUrl}/customer`, car);
    }

    public updateClient(car: Client): Observable<void> {
        return this.http.put<void>(`${environments.apiUrl}/customer`, car);
    }

    public deleteClient(id: number): Observable<void> {
        return this.http.delete<void>(`${environments.apiUrl}/customer/${id}`,);
    }
}
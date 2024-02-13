import { Injectable } from "@angular/core";
import { LoginModel } from "../models/login";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { environments } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) {}

    public login(login: LoginModel): Observable<User> {
        return this.http.post<User>(`${environments.apiUrl}/Auth/login`, login);
    }

    public logout(): void {
        localStorage.removeItem('currentUser');
    }
}
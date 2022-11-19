import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { url } from "../constants/urls.constants";
import { LoginRequest } from "../models/login-request.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) { }

    login(request: LoginRequest): Observable<string> {
        return this.http.post<string>(`${url}/login`, request);
    }
}
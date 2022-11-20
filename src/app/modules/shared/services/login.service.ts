import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/app.reducer";
import { LoginToken } from "../actions/auth.actions";
import { url } from "../constants/urls.constants";
import { LoginRequest } from "../models/login-request.model";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient, private store: Store<AppState>) { }

    localLogin() {
        if (localStorage.length > 0) {
            const token = localStorage.getItem('token');
            const userId = +localStorage.getItem('userId');
            this.store.dispatch(new LoginToken({ token, userId }))
        }
    }

    login(request: LoginRequest): Observable<{ token: string, userId: number }> {
        return this.http.post<{ token: string, userId: number }>(`${url}/login`, request);
    }
}
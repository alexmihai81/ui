import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { first, flatMap, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { authDetails } from "../selectors/auth.selector";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(authDetails).pipe(
            first(),
            flatMap(authDetails => {
                return next.handle(this.addTokenToRequest(req, authDetails));
            })
        )
    }

    private addTokenToRequest(request: HttpRequest<any>, authDetails: any) {
        if (authDetails && authDetails.loggedIn) {
            return request.clone({ setHeaders: { Authorization: `Bearer ${authDetails.token}` } })
        }
        return request;
    }
}
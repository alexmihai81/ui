import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    Login_Successfully = '[Login] Login Successfully'
}

export class LoginToken implements Action {
    readonly type = AuthActionTypes.Login_Successfully;
    constructor(public payload: { token: string }) { }
}

export type AuthAction = LoginToken;
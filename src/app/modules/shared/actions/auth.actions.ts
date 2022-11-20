import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    Login_Successfully = '[Login] Login Successfully'
}

export class LoginToken implements Action {
    readonly type = AuthActionTypes.Login_Successfully;
    constructor(public payload: { token: string, userId: number }) { }
}

export type AuthAction = LoginToken;
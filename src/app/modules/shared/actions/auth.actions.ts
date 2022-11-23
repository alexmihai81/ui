import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    Login_Successfully = '[Login] Login Successfully',
    Profile = '[Login] Profile'
}

export class LoginToken implements Action {
    readonly type = AuthActionTypes.Login_Successfully;
    constructor(public payload: { token: string, userId: number }) { }
}

export class ProfileIdUpdate implements Action {
    readonly type = AuthActionTypes.Profile;
    constructor(public payload: { profileId: number; }) { }
}

export type AuthAction = LoginToken | ProfileIdUpdate;
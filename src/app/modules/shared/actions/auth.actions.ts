import { Action } from "@ngrx/store";

export enum AuthActionTypes {
    Login_Successfully = '[Login] Login Successfully',
    Profile = '[Login] Profile',
    Logout = '[Login] Logout'
}

export class LoginToken implements Action {
    readonly type = AuthActionTypes.Login_Successfully;
    constructor(public payload: { token: string, userId: number }) { }
}

export class ProfileIdUpdate implements Action {
    readonly type = AuthActionTypes.Profile;
    constructor(public payload: { profileId: number; }) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
  constructor(public payload: {token: string, userId: number, profileId: number}) {
  }
}

export type AuthAction = LoginToken | ProfileIdUpdate | Logout;

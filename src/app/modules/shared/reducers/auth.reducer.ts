import { AuthAction, AuthActionTypes } from "../actions/auth.actions"

export interface AuthState {
    loggedIn: boolean,
    token: string
}

export const initialAuthState: AuthState = {
    loggedIn: true,
    token: ''
}

export function authReducer(state = initialAuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login_Successfully:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token
            }
        default:
            return state;
    }
}
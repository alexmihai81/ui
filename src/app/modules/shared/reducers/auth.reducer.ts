import { AuthAction, AuthActionTypes } from "../actions/auth.actions"

export interface AuthState {
    loggedIn: boolean,
    token: string
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    token: ''
}

export function authReducer(state = initialAuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login_Successfully:
            return {
                loggedIn: true,
                token: action.payload.token
            }
    }
}
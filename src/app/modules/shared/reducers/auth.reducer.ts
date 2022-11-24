import { AuthAction, AuthActionTypes } from "../actions/auth.actions"

export interface AuthState {
    loggedIn: boolean,
    token: string,
    userId: number,
    profileId: number
}

export const initialAuthState: AuthState = {
    loggedIn: false,
    token: '',
    userId: -1,
    profileId: -1
}

export function authReducer(state = initialAuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.Login_Successfully:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
                userId: action.payload.userId
            }
        case AuthActionTypes.Profile:
            return {
                ...state,
                profileId: action.payload.profileId
            }
        default:
            return state;
    }
}

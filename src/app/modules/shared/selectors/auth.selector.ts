import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";

export const selectAuthState = (state: AppState) => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.loggedIn
)

export const authDetails = createSelector(
    selectAuthState,
    auth => auth
)
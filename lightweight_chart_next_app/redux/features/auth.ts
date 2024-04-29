import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

type AuthState = {
    allowedScopes: string[] | undefined;
};

const initialState: AuthState = {
    allowedScopes: undefined
};

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        signInDataSave: (state, action: PayloadAction<AuthState>) => {
            state.allowedScopes = action.payload.allowedScopes;
        },
        signOutDataCleat: (state) => {
            state = initialState;
        }
    }
});

export const { signInDataSave, signOutDataCleat } = auth.actions;
export default auth.reducer;

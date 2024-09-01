import { createSlice } from "@reduxjs/toolkit";
import { Member } from "src/types/types";

interface AuthState {
  accessToken?: string;
  currentUser?: {
    id: string;
    profilePicture?: string;
    phone: string;
    isSuperAdmin?: boolean;
    relatives: Member[];
    firstName?: string;
    lastName?: string;
    parent?: any;
    root?: any;
    pushTokens?: string[];
  } | null;
}

const initialState: AuthState = {
  currentUser: null,
  accessToken: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = {
        id: action.payload?.id,
        phone: action?.payload?.phone,
        profilePicture: action?.payload?.profilePicture,
        isSuperAdmin: action?.payload?.isSuperAdmin,
        firstName: action?.payload?.firstName,
        lastName: action?.payload?.lastName,
        relatives: action?.payload?.relatives,
      };
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setUser, setAccessToken } = authSlice?.actions;

export default authSlice.reducer;

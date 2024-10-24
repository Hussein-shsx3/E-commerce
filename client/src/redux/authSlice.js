import { createSlice } from "@reduxjs/toolkit";
import { register, auth } from "../Api/authApi";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  user: null,
  token: cookies.get("token") || null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.status = "idle";
      cookies.remove("user");
      cookies.remove("token");
      cookies.remove("isAdmin");
    },
    clearStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userDetails;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(auth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.userDetails;
        state.token = action.payload.token;
        cookies.set("token", action.payload.token);
        cookies.set("isAdmin", action.payload.userDetails.isAdmin);
      })
      .addCase(auth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, clearStatus } = authSlice.actions;

export default authSlice.reducer;

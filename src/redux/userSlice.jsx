import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
     name: "user",
     initialState: {
          users: {
               allUser: null,
               isFetching: false,
               error: false
          },

     },
     reducers: {
          getUserStart: (state) => {
               state.user.isFetching = true;
          },
          getUserSuccess: (state, action) => {
               state.user.isFetching = false;
               state.user.allUser = action.payload
          },
          getUserFailed: (state) => {
               state.user.isFetching = false;
               state.user.error = true;
          }

     }

})

export const {
     getUserFailed,
     getUserStart,
     getUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
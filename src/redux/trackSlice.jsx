import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
     name: 'track',
     initialState: {
          track: null,
          error: null,
     },
     reducers: {
          createTrackStart: (state) => {
               state.track = null;
               state.error = null;
          },
          createTrackSuccess: (state, action) => {
               state.track = action.payload.track;
               state.error = null;
          },
          createTrackError: (state, action) => {
               state.track = null;
               state.error = action.payload.error;
          },
     },
});

export const { createTrackStart, createTrackSuccess, createTrackError } = trackSlice.actions;

export default trackSlice.reducer;

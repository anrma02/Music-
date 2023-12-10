import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
     name: 'track',
     initialState: {
          trackData: {
               name: '',
               duration: '',
               artist: '',
               genre: '',
               audio: null,
               image: null,
               pending: false,
               error: false,

          },
     },

     reducers: {
          updateStart: (state) => {
               state.trackData.pending = true;
               state.trackData.error = false;
          },
          updateError: (state) => {
               state.trackData.pending = false;
               state.trackData.error = true;
          },
          updateSuccess: (state, action) => {
               state.trackData.pending = false;
               state.trackData.error = false;
               state.trackData.name = action.payload.name;
               state.trackData.duration = action.payload.duration;
               state.trackData.artist = action.payload.artist;
               state.trackData.genre = action.payload.genre;
               state.trackData.audio = action.payload.audio;
               state.trackData.image = action.payload.image;


          },

     },
});

export const {
     updateStart,
     updateError,
     updateSuccess,
} = trackSlice.actions;

export default trackSlice.reducer;

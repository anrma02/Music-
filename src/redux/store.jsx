import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice'
import userReducer from './userSlice'
// import playerReducer from './Services/playerSlice'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },
});

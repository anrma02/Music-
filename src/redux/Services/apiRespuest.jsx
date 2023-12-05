import axios from 'axios';
import { logOutStart, loginFailure, loginStart, loginSuccess, registerStart } from '../authSlice';
import { getUserFailed, getUserStart, getUserSuccess } from '../userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:8000/auth/signin', user);
        if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            navigate('/');
        } else {
            dispatch(loginFailure(res.data));
        }
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post('http://localhost:8000/auth/register', user);
        dispatch(loginSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(loginFailure());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axiosJWT.get('http://localhost:8000/user/get_user/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // token: `Bearer ${accessToken}`
                // token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const logOut = async (dispatch, navigate, axios, accessToken) => {
    dispatch(logOutStart());
    try {
        await axios.post('http://localhost:8000/auth/logout', {
            headers: {
                // token: `Bearer ${accessToken}`,
                Authorization: `Bearer ${accessToken}`,
            },
        });
        dispatch(loginSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(loginFailure());
    }
};

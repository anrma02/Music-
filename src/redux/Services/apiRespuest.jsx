
import { logOutFailure, logOutStart, loginFailure, loginStart, loginSuccess, logoutSuccess, registerStart } from '../authSlice';

import { getUserFailed, getUserStart, getUserSuccess } from '../userSlice';
import axios from 'axios';



export const createTrack = async (trackData) => {
    try {
        const formData = new FormData();
        formData.append('name', trackData.name);
        formData.append('artist', trackData.artist);
        formData.append('duration', trackData.duration);
        formData.append('genre', trackData.genre);
        formData.append('album', trackData.album);
        formData.append('audio', trackData.audio);
        formData.append('image', trackData.image);

        const response = await axios.post('http://localhost:8000/track/create_track', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data
    } catch (error) {
        console.log(error);

    }
};


export const updateTrack = async (trackData, trackId) => {

    try {
        const formData = new FormData();
        formData.append("name", trackData.name);
        formData.append("duration", trackData.duration);
        formData.append("genre", trackData.genre);
        formData.append('artist', trackData.artist);
        formData.append("audio", trackData.audio);
        formData.append("image", trackData.image);

        const response = await axios.put(`http://localhost:8000/track/update_track/${trackId}`, formData, {

        });
        return response && response.data;



    } catch (error) {
        console.log(error);
    }
}

export const deleteTrack = async (trackId) => {
    try {
        const response = await axios.delete(`http://localhost:8000/track/detele_track/${trackId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


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

export const getAllUsers = async (accessToken, dispatch) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get('http://localhost:8000/user/get_user/', {
            headers: {
                token: `Bearer ${accessToken}`,
                // Authorization: `Bearer ${accessToken}`,
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
        await axios.post('http://localhost:8000/auth/logout/', accessToken);
        dispatch(logoutSuccess());
        navigate('/');
    } catch (error) {
        dispatch(logOutFailure());
    }
};

// export const getTrack = async (track, dispatch, page) => {
//     dispatch(trackStart());
//     try {
//         const res = await axios.get(`http://localhost:8000/track/get_track?${page}`, track);
//         dispatch(trackSuccess(res.data))
//         dispatch(updatePagination({ page: res.data.page, totalPages: res.data.totalPages }));
//     } catch (error) {
//         dispatch(trackFailure())
//     }
// }


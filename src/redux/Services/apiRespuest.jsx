import axios from "axios";
import { loginFailure, loginStart, loginSuccess, registerStart } from "../authSlice";
import { getUserFailed, getUserStart, getUserSuccess } from "../userSlice";

export const loginUser = async (user, dispatch, navigate) => {
     dispatch(loginStart());
     try {
          const res = await axios.post("http://localhost:8000/auth/signin", user);
          if (res.status === 200) {
               dispatch(loginSuccess(res.data));
               navigate("/");
          } else {
               dispatch(loginFailure(res.data.message));

          }
     } catch (error) {
          dispatch(loginFailure(error.message));
          console.log("Lỗi khi gửi yêu cầu đăng nhập:", error.message);

     }
};


export const registerUser = async (user, dispatch, navigate) => {
     dispatch(registerStart());
     try {
          await axios.post("http://localhost:8000/auth/register", user);
          dispatch(loginSuccess());
          navigate("/login");
     } catch (error) {
          dispatch(loginFailure());
     }
}

export const getAllUsers = async (accessToken, dispatch) => {
     dispatch(getUserStart())
     try {
          const res = await axios.get("http://localhost:8000/user/get_user/", {
               headers: {
                    Authorization: `Bearer ${accessToken}`
               }
          });
          dispatch(getUserSuccess(res.data))
     } catch (error) {
          dispatch(getUserFailed())
     }
}

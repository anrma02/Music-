/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


import { getAllUsers } from "~/redux/Services/apiRespuest";
import { loginSuccess } from "~/redux/authSlice";


function HomePage() {
    const user = useSelector(state => state.auth.login?.currentUser)
    const useList = useSelector(state => state.user?.allUser)

    console.log("🚀HomePage ~ useList:", useList);

    const dispatch = useDispatch();


    useEffect(() => {
        getAllUsers(user.accessToken, dispatch, loginSuccess)

    }, [])

    return <div className="text-red-900">

    </div>;
}

export default HomePage;

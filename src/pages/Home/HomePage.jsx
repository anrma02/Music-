
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { getAllUsers } from "~/redux/Services/apiRespuest";

function HomePage() {

    const user = useSelector(state => state.auth.login?.currentUser)
    const dispatch = useDispatch();

    console.log("🚀 ~ file: HomePage.jsx:8 ~ HomePage ~ user:", user);


    useEffect(() => {
        getAllUsers(user?.accessToken, dispatch)
    }, [])

    return <div className="text-red-900">

    </div>;
}

export default HomePage;

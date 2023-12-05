import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";
import { useDispatch } from 'react-redux';
import { FaExclamationCircle } from "react-icons/fa";


import style from "./Login.module.scss";
import { LogoIcon } from "~/components/Icon";
import config from "~/config";
import { useState } from "react";
import { loginUser } from "~/redux/Services/apiRespuest"

const cx = classNames.bind(style);

function LoginPage() {
     const [username, setUsername] = useState("");
     const [password, setPassword] = useState("");
     const [showPass, setShowPass] = useState(false);
     const [error, setError] = useState('');

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleLogin = async (e) => {
          e.preventDefault();
          if (!username) {
               return setError("Please enter information in the input")
          } else if (!password) {
               return setError("Please enter password in the input")
          }
          setError("");

          const newUser = {
               username: username,
               password: password,

          }
          try {
               await loginUser(newUser, dispatch, navigate);
          } catch (error) {
               // Handle login error
               console.error("Login failed:", error);
          }
     }

     const handleUsername = (e) => {
          setUsername(e.target.value)
     }

     const handlePassword = (e) => {
          setPassword(e.target.value)
     }
     const handleShowPass = () => {
          setShowPass(!showPass);
     }


     return (
          <div className="bg-[#171717db] h-full max-h-[100vh] ">
               <header className="bg-black h-[100px] flex items-center py-[32px] pl-[51px]">
                    <Link to={config.routes.home} >
                         <LogoIcon />
                    </Link>
               </header>
               <div className="p-[20px] flex-3 flex-shrink-1 flex-grow-0 flex justify-center ">
                    <div className=" max-w-[734px] w-full ">
                         <div className="bg-[#000000cb] rounded-[6px]">
                              <h1 className=" my-[48px] text-white text-center text-[24px] font-bold">Login Spotify</h1>
                              <hr className=" my-[32px] border-t-[1px] border-t-[#a5a5a5] mx-[100px] " />

                              <div className="w-[324px] m-auto">
                                   {error &&
                                        <div className=" bg-red-600 mb-[32px] justify-center rounded-[6px] h-[50px] flex items-center text-[14px] font-semibold text-white ">
                                             <FaExclamationCircle className="text-black text-[20px] pr-[5px]" />
                                             <span> {error}</span>
                                        </div>

                                   }
                                   <div className="pb-4 c ">
                                        <form onSubmit={handleLogin} >
                                             <div className="pb-[12px]">

                                                  <div className="pb-[10px]">
                                                       <label htmlFor="" className="text-white font-bold ">User Name  </label></div>
                                                  <input
                                                       value={username}
                                                       className={cx("input-form")}
                                                       placeholder="User Name  "
                                                       onChange={handleUsername}

                                                  />
                                             </div>


                                             <div className="pb-[12px]">
                                                  <div className="pb-[10px]">
                                                       <label htmlFor="" className="text-white font-bold ">Password</label>
                                                  </div>
                                                  <div className="relative ">
                                                       <input
                                                            name="password"
                                                            value={password}
                                                            type={showPass ? "text" : "password"}
                                                            onChange={handlePassword}
                                                            className={cx("input-form")}
                                                            placeholder="Password"

                                                       />
                                                       <span className="absolute right-[12px] top-[30%] translate-y(-30%) text-[#d4d4d4] " onClick={handleShowPass}> {showPass ? <FaEye /> : <FaEyeSlash />} </span>
                                                  </div>
                                             </div>

                                             <div className="text-center py-[32px] ">
                                                  <div className={cx("btn-login")}>
                                                       <button type="submit" >
                                                            Login
                                                       </button>
                                                  </div>

                                             </div>

                                        </form>

                                   </div>


                              </div>
                              <hr className=" my-[32px] border-t-[1px] border-t-[#a5a5a5] mx-[100px] " />
                              <div className="text-white pb-[32px] text-center">

                                   <span>{"Don't"} have an account yet? </span>
                                   <Link to={config.routes.signup} className="text-[#f6f6f6] font-bold hover:underline hover:text-[#14d814] ">
                                        Sign Up
                                   </Link>
                              </div>
                         </div>

                    </div>
               </div>
          </div >
     );
}

export default LoginPage;
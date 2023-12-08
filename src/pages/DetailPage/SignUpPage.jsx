import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import classNames from "classnames/bind";
import { useDispatch } from "react-redux";


import style from "./Login.module.scss";
import { LogoIcon } from "~/components/Icon";
import config from "~/config";
import { useState } from "react";
import { registerUser } from "~/redux/Services/apiRespuest";

const cx = classNames.bind(style);

function SignUpPage() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [firstName, setFirstName] = useState("");
     const [lastName, setLastName] = useState("");
     const [userName, setUserName] = useState("");
     const [showPass, setShowPass] = useState(false);
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const handleSignUp = (e) => {

          e.preventDefault();
          const newUser = {
               email: email,
               password: password,
               firstname: firstName,
               lastname: lastName,
               username: userName
          }
          registerUser(newUser, dispatch, navigate)
     }

     const handleShowPass = () => {
          setShowPass(!showPass);
     }

     return (
          <div className="bg-[#171717db] h-full max-h-[100vh] ">
               <header className="bg-black h-[100px] flex items-center  pl-[51px]">
                    <Link to={config.routes.home} >
                         <LogoIcon />
                    </Link>
               </header>
               <div className="p-[32px] flex-3 flex-shrink-1 flex-grow-0 flex justify-center ">
                    <div className=" max-w-[734px] w-full ">
                         <div className="bg-[#000000cb] rounded-[6px]">
                              <div className="pb-[5px] my-[20px]"  ></div >
                              <h1 className=" pb-[10px] text-white text-center text-[24px] font-bold">Login Spotify</h1>

                              <div className="w-[324px] m-auto">
                                   <div className="pb-4 c ">
                                        <form onSubmit={handleSignUp} >

                                             <div className="flex gap-3">
                                                  <div className="pb-[10px]">
                                                       <div className="pb-[8px]">
                                                            <label htmlFor="" className="text-white font-bold "> Last Name </label></div>
                                                       <input type="text"
                                                            value={lastName}
                                                            className={cx("input-form")}
                                                            placeholder=" Last Name"
                                                            onChange={(e) => setLastName(e.target.value)} />
                                                  </div>
                                                  <div className="pb-[10px]">
                                                       <div className="pb-[8px]">
                                                            <label htmlFor="" className="text-white font-bold "> First Name </label></div>
                                                       <input
                                                            type="text"
                                                            value={firstName}
                                                            className={cx("input-form")}
                                                            placeholder=" First Name"
                                                            onChange={(e) => setFirstName(e.target.value)} />
                                                  </div>
                                             </div>

                                             <div className="pb-[10px]">
                                                  <div className="pb-[8px]">
                                                       <label htmlFor="" className="text-white font-bold ">User Name   </label></div>
                                                  <input
                                                       type="text"
                                                       className={cx("input-form")}
                                                       placeholder="User Name"
                                                       value={userName}
                                                       onChange={(e) => setUserName(e.target.value)}
                                                  />
                                             </div>

                                             <div className="pb-[10px]">
                                                  <div className="pb-[8px]">
                                                       <label htmlFor="" className="text-white font-bold "> Email </label></div>
                                                  <input
                                                       type="email"
                                                       className={cx("input-form")}
                                                       placeholder=" Email"
                                                       value={email}
                                                       onChange={(e) => setEmail(e.target.value)}
                                                  />
                                             </div>

                                             <div className="pb-[10px]">
                                                  <div className="pb-[8px]">
                                                       <label htmlFor="password" className="text-white font-bold ">Password</label>
                                                  </div>
                                                  <div className="relative ">
                                                       <input
                                                            type={showPass ? "text" : "password"}
                                                            className={cx("input-form")}
                                                            placeholder="Password"
                                                            value={password}

                                                            onChange={(e) => setPassword(e.target.value)}
                                                       />
                                                       <span className="absolute right-[12px] top-[30%] translate-y(-30%) text-[#d4d4d4] " onClick={handleShowPass}> {showPass ? <FaEye /> : <FaEyeSlash />} </span>
                                                  </div>
                                             </div>
                                             <div className="text-center py-[25px] ">
                                                  <div className={cx("btn-login")}>
                                                       <button>
                                                            Sign Up
                                                       </button>
                                                  </div>
                                             </div>
                                        </form>
                                   </div>
                              </div>
                              <hr className=" my-[20px] border-t-[1px] border-t-[#a5a5a5] mx-[100px] " />
                              <div className="text-white pb-[20px] text-center">

                                   <span>Are you looking to create an account?  </span>
                                   <Link to={config.routes.login} className="text-[#f6f6f6] font-bold hover:underline hover:text-[#14d814] ">
                                        Login here.
                                   </Link>
                              </div>
                         </div>

                    </div>
               </div>
          </div >
     );
}

export default SignUpPage;
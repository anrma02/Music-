import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete, MdOutlineUpdate } from "react-icons/md";


import './HandleButton/admin.scss'

import { getAllUsers } from "~/redux/Services/apiRespuest";
import CreateTrack from "./HandleButton/CreateButton";


function formatDate(dateString) {
     return moment(dateString).format('DD/MM/YYYY');
}


function UserList() {

     const user = useSelector(state => state.auth.login?.currentUser)
     const useList = useSelector(state => state.users.users?.allUsers.data)
     console.log("🚀HomePage ~ useList:", useList);

     const dispatch = useDispatch();
     useEffect(() => {
          getAllUsers(user?.accessToken, dispatch)

     }, [dispatch, user?.accessToken])

     return (
          <>
               <div className="m-auto h-full max-h-[550px]">
                    <div>
                         <div className="p-4 ">
                              <div className="bg-[#38373760] p-4 rounded-md">
                                   <div>
                                        <h2 className="mb-4 text-[24px] font-bold text-white">Admin & User</h2>


                                        <div className="flex justify-between bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-md py-2 px-4 text-white font-bold text-[18px]">
                                             <div>
                                                  <span>UserName</span>
                                             </div>
                                             <div>
                                                  <span>Email</span>
                                             </div>

                                             <div>
                                                  <span>First Name</span>
                                             </div>
                                             <div>
                                                  <span>Last Name</span>
                                             </div>
                                             <div>
                                                  <span>Time</span>
                                             </div>

                                             <div>
                                                  <span>Edit</span>
                                             </div>
                                        </div>


                                        < >
                                             {useList?.map((item, index) =>
                                                  <div key={index.id} >
                                                       <div className="flex text-white p-4 justify-between border-t text-[16px] font-normal mt-4 space-x-4 hover:bg-[#81818136]   ">
                                                            <div className="flex">
                                                                 <span >{item.username}</span>
                                                            </div>
                                                            <div  >
                                                                 <span className="whitespace-nowrap" >{item.email}</span>
                                                            </div>
                                                            <div>
                                                                 <span>{item.firstname ?? 'null'}</span>
                                                            </div>
                                                            <div>
                                                                 <span>{item.lastname ?? "null"}</span>
                                                            </div>
                                                            <div className="px-2">
                                                                 <span>
                                                                      {formatDate(item.createdAt)} </span>
                                                            </div>
                                                            <div className="px-2">

                                                                 <div className="add">
                                                                      <CreateTrack />

                                                                      <button>
                                                                           <MdDelete />
                                                                      </button>
                                                                      <button>
                                                                           <IoIosAddCircle />
                                                                      </button>
                                                                      <button>
                                                                           <MdOutlineUpdate />
                                                                      </button>
                                                                 </div>

                                                            </div>
                                                       </div>
                                                  </div>

                                             )}

                                        </>


                                   </div>
                              </div>
                         </div>
                    </div>

               </div>





          </>
     );
}

export default UserList;
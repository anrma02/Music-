import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames/bind";

import "react-toastify/dist/ReactToastify.css";
import Image from "~/assest/image";
import './HandleButton/admin.scss';
import style from './admin.module.scss'

import HandleCreateAlbum from "./HandleButton/Album/HandleCreateAlbum";
import { MdOutlineUpdate } from "react-icons/md";
import HandleDeleteAlbum from "./HandleButton/Album/HandleDeleteAlbum";
import { deleteAlbum } from "~/redux/Services/apiRespuest";
import HandleAddTrackToAlbum from "./HandleButton/Album/HandleAddTrackToAlbum";


const baseUrl = 'http://localhost:8000/';
const cx = classNames.bind(style);

function AdminAlbum() {
     const [album, setAlbum] = useState([]);


     const fetchAlbum = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/album/get_album?page=1`)
               const result = res.data

               console.log("🚀 ~ file: AdminAlbum.jsx:30 ~ fetchAlbum ~ result:", result);


               setAlbum(result.items);
          } catch (error) {
               console.log(error);
          }

     }, []);

     useEffect(() => {
          fetchAlbum();
     }, [fetchAlbum])

     useEffect(() => { }, [album]);



     const handleDelete = async (albumId) => {
          try {
               const response = await deleteAlbum(albumId);
               toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });

               fetchAlbum()
          } catch (error) {
               console.error('Error deleting track:', error);
               toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
          }
     };

     return (
          <>

               <div className="mx-[100px] h-full max-h-[550px] overflow-x-scroll  ">
                    <ToastContainer />
                    <HandleCreateAlbum />

                    <div className=" text-white grid md:grid-cols-[200px_200px_200px_200px_200px_200px] gap-8  ">
                         {album.map((item, index) => (
                              <div className=' bg-[#101010a5] h-[250px] w-[200px] relative hover:bg-[#46464648]' key={index.id}>
                                   <>
                                        <div className=" p-2 rounded-2xl ">
                                             <Image
                                                  className={'w-full rounded-[5px] h-full max-h-[200px]'}
                                                  src={baseUrl + item.image?.path}
                                                  alt={item.name}
                                             />
                                             <div className={'mt-[12px] mb-[10px] '}>
                                                  <div className={'flex items-center justify-center overflow-auto font-semibold text-white '}>
                                                       <span>{item.name} </span>

                                                  </div>
                                                  <div className="text-[12px] text-center font-semibold">
                                                       <span>{item.releaseDate} </span> . <span>{item.artist?.name}
                                                       </span>
                                                  </div>
                                             </div>
                                        </div>
                                   </>
                                   <div className={cx('ho')}>
                                        <div className="add">

                                             <HandleDeleteAlbum albumId={item._id} albumName={item.name} onDelete={handleDelete} />
                                             <HandleAddTrackToAlbum albumId={item._id} />
                                             <button  >
                                                  <MdOutlineUpdate />
                                             </button>

                                             <button> </button>
                                        </div>
                                   </div>
                              </div>


                         ))
                         }
                    </div>
               </div>


          </>
     );
}

export default AdminAlbum;
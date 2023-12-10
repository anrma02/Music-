import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames/bind";

import "react-toastify/dist/ReactToastify.css";
import Image from "~/assest/image";
import HandleCreateArtist from "./HandleButton/Artist/HandleCreateArtist";
import './HandleButton/admin.scss';
import style from './admin.module.scss'
import HandleUpdateArtist from "./HandleButton/Artist/HandleUpdateArtist";

import HandleDeleteArtist from "./HandleButton/Artist/HandleDeleteArtist";
import { deleteArtist } from "~/redux/Services/apiRespuest";
import HandleAddTrackToArtist from "./HandleButton/Artist/HandleAddTrackToArtist";


const baseUrl = 'http://localhost:8000/';
const cx = classNames.bind(style);

function AdminArtist() {
     const [artist, setArtist] = useState([]);


     const fetchArtist = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/artist/get_all_artist?page=1`)
               const result = res.data

               setArtist(result.items);
          } catch (error) {
               console.log(error);
          }

     }, []);

     useEffect(() => {
          fetchArtist();
     }, [fetchArtist])

     useEffect(() => { }, [artist]);

     const handleUpdateArtist = (updateArtist) => {
          const updatedArtistList = artist.map((t) =>
               t.id === updateArtist.id ? updateArtist : t
          );
          setArtist(updatedArtistList);
     };

     const handleDelete = async (trackId) => {
          try {
               const response = await deleteArtist(trackId);
               toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
               console.log('Artist deleted successfully');
               fetchArtist()
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
                    <HandleCreateArtist />

                    <div className=" text-white grid md:grid-cols-[200px_200px_200px_200px_200px_200px] gap-8  ">
                         {artist.map((item, index) => (
                              <div className=' bg-[#101010a5] h-[250px] w-[200px] relative hover:bg-[#46464648]' key={index.id}>
                                   <>
                                        <div className=" p-2 rounded-2xl ">
                                             <Image
                                                  className={'w-full rounded-[5px] h-full max-h-[200px]'}
                                                  src={baseUrl + item.image?.path}
                                                  alt={item.name}
                                             />
                                             <div className={'mt-[16px]  '}>
                                                  <div className={'flex items-center justify-center overflow-auto font-semibold text-white '}>
                                                       <span>{item.name}</span>
                                                  </div>

                                             </div>
                                        </div>
                                   </>
                                   <div className={cx('ho')}>
                                        <div className="add">

                                             <HandleDeleteArtist artistId={item._id} artistName={item.name} onDelete={handleDelete} />
                                             <HandleAddTrackToArtist artistId={item._id} />
                                             <HandleUpdateArtist artistId={item._id} onUpdate={handleUpdateArtist} />

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

export default AdminArtist;
import { toast } from 'react-toastify';
import HeadlessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { MdOutlineUpdate } from "react-icons/md";
import PropTypes from 'prop-types';


import { updateTrack } from '~/redux/Services/apiRespuest';
import "tippy.js/dist/tippy.css";
import '../admin.scss';

function UpdateButton({ trackId, onUpdate }) {

     console.log("🚀 ~ file: UpdateButton.jsx:15 ~ UpdateButton ~ trackId:", trackId);



     const [isModalOpen, setIsModalOpen] = useState(false);
     const [artist, setArtist] = useState([]);
     const [trackData, setTrackData] = useState({
          name: "",
          duration: "",
          genre: "",
          artist: "",
          audio: "",
          image: "",
     });


     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = useCallback(() => {
          setIsModalOpen(false);
     }, []);

     const handleBlur = () => {
          closeModal();
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setTrackData({
               ...trackData,
               [name]: value,
          });
     };

     const handleFileChange = (e) => {
          const { name, files } = e.target;
          setTrackData({
               ...trackData,
               [name]: files[0],
          });
     };

     const handleUpdate = async (e) => {
          e.preventDefault();
          try {
               const response = await updateTrack(trackData, trackId);

               toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });

               onUpdate({ ...trackData, id: trackId }); // Include id in the updated track data

               closeModal();
          } catch (error) {
               console.log("Error updating track:", error);
          }
     };
     const handleArtistChange = (e) => {
          const selectedArtistId = e.target.value;

          setTrackData({
               ...trackData,
               artist: selectedArtistId,
          });
     };
     useEffect(() => {
          const artistData = async () => {
               try {
                    const res = await axios.get('http://localhost:8000/artist/get_all_artist');
                    const result = res.data;

                    console.log("🚀 ~ file: UpdateButton.jsx:89 ~ artistData ~ result:", result);


                    setArtist(result.items);
               } catch (error) {
                    console.log("🚀 CreateButton.jsx:94 ~ artistData ~ error:", error);
               }
          };
          artistData();
     }, []);


     return (
          <>

               <HeadlessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[100, 400]}
                    appendTo={() => document.body}
                    render={(attrs) => (

                         <div tabIndex="-1" {...attrs} className="relative bg-[#292929be] w-[550px] rounded-[10px] ">
                              <button onClick={closeModal} className="w-full flex items-center justify-center ">
                                   <IoIosCloseCircleOutline className=" absolute top-0 right-0 text-[30px] font-bold text-[#e30000c0] hover:text-[#f32c2c] " />
                              </button>
                              <h3 className="text-white font-bold mt-[20px] text-[24px] text-center mb-[20px] ">Update Track </h3>

                              <div className="w-full max-w-[600px]">
                                   <form onSubmit={handleUpdate} className="  rounded-[5px] shadow-md   px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Title</label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="name"
                                                  type="text"
                                                  value={trackData.name}
                                                  onChange={handleInputChange}
                                                  placeholder="Title Song" />
                                        </div>
                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Duration</label>
                                             <input
                                                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                  type="text"
                                                  name="duration"
                                                  value={trackData.duration}
                                                  onChange={handleInputChange}
                                                  placeholder="Duration" />
                                        </div>
                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Genre</label>
                                             <input
                                                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                  type="text"
                                                  name="genre"
                                                  value={trackData.genre}
                                                  onChange={handleInputChange}
                                                  placeholder="Genre" />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Artist</label>
                                             <select
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="artist"
                                                  onChange={handleArtistChange}
                                                  value={trackData.artist || ''}
                                             >
                                                  <option value='' disabled={!trackData.artist}>Select an artist</option>
                                                  {artist.map((artist) => (
                                                       <option key={artist._id} value={artist._id}>
                                                            {artist.name}
                                                       </option>
                                                  ))}
                                             </select>
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Audio</label>
                                             <input
                                                  className="shadow appearance-none text-white border border-red-500 rounded w-full py-2 px-3   mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                  type="file"
                                                  name="audio"

                                                  accept="audio/mpeg, audio/mp3"
                                                  onChange={handleFileChange}
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Image</label>
                                             <input
                                                  name="image"
                                                  accept="image/png, image/jpg, image/jpeg"
                                                  className="shadow appearance-none text-white border border-red-500 rounded w-full py-2 px-3  mb-3  "
                                                  type="file"
                                                  onChange={handleFileChange}
                                                  placeholder="image" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                             <button
                                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                  type="submit">
                                                  Update
                                             </button>
                                        </div>
                                   </form>

                              </div>

                         </div>

                    )}
               >
                    <button onClick={openModal}>
                         <MdOutlineUpdate />
                    </button>
               </HeadlessTippy >

          </>

     );
}
UpdateButton.propTypes = {
     trackId: PropTypes.string,
     onUpdate: PropTypes.func,
};

export default UpdateButton;
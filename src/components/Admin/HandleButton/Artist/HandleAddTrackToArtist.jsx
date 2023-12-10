import { IoIosAddCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { useCallback, useEffect, useState } from 'react';
import HeadLessTippy from "@tippyjs/react/headless"
import axios from "axios";

import PropTypes from 'prop-types';
import { toast } from "react-toastify";



function HandleAddTrackToArtist({ artistId }) {

     const [isModalOpen, setIsModalOpen] = useState(false);
     const [trackData, setTrackData] = useState([]);
     const [selectedTracks, setSelectedTracks] = useState([]);

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const handleBlur = () => {
          closeModal();
     };
     const fetchTrackData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/track/get_track?artistId=${artistId}&page=1`);
               const result = res.data;
               setTrackData(result.items);
          } catch (error) {
               console.log(error);
          }
     }, [artistId]);

     useEffect(() => {
          fetchTrackData();
     }, [fetchTrackData]);

     const handleCheckboxChange = (trackId) => {
          const updatedSelectedTracks = selectedTracks.includes(trackId)
               ? selectedTracks.filter((id) => id !== trackId)
               : [...selectedTracks, trackId];
          setSelectedTracks(updatedSelectedTracks); console.log("🚀 ~ file: HandleAddTrackToArtist.jsx:44 ~ handleCheckboxChange ~ updatedSelectedTracks:", updatedSelectedTracks);
     };

     const handleAdd = async (e) => {
          e.preventDefault();
          try {



               await axios.post(`http://localhost:8000/artist/add_track_artist/${artistId}`, {
                    trackId: selectedTracks
               });
               toast.success("Add Track to Artist successfully", {
                    position: toast.POSITION.TOP_RIGHT,
               })

          } catch (error) {
               console.log("Handle Add track to Artist", error);
               toast.error(error.message, {
                    position: toast.POSITION.TOP_RIGHT,
               })
          }
     };

     return (
          <>
               <HeadLessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[0, 0]}
                    appendTo={() => document.body}
                    render={(attrs) => (

                         <div tabIndex="-1" {...attrs} className="relative bg-[#161616ee] w-[550px] rounded-[10px] ">
                              <button onClick={closeModal} className="w-full flex items-center justify-center ">
                                   <IoIosCloseCircleOutline className=" absolute top-0 right-0 text-[30px] font-bold text-[#e30000c0] hover:text-[#f32c2c] " />
                              </button>
                              <h3 className="text-white font-bold mt-[20px] text-[24px] text-center mb-[20px] "> Add Track to Artist</h3>
                              <div className="w-full max-w-[600px]">
                                   <form onSubmit={handleAdd} className="  rounded-[5px] shadow-md   px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-6 h-[150px] overflow-y-scroll ">
                                             <label className="block text-white text-[16px] font-bold mb-2">Add Track To Artist</label>
                                             {trackData?.map((item) => (
                                                  <div key={item._id} className="mb-2">
                                                       <label className="inline-flex items-center">
                                                            <input
                                                                 type="checkbox"
                                                                 className="form-checkbox h-5 w-5 text-blue-500"
                                                                 value={item._id}
                                                                 onChange={() => handleCheckboxChange(item._id)}
                                                                 checked={selectedTracks.includes(item._id)}
                                                            />
                                                            <span className="ml-2 text-white">{item.name}</span>
                                                       </label>
                                                  </div>
                                             ))}
                                        </div>
                                        <div className="flex items-center justify-between">
                                             <button
                                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                  type="submit"
                                             >
                                                  Add Track to Artist
                                             </button>
                                        </div>
                                   </form>

                              </div>
                         </div>
                    )}  >
                    <button onClick={openModal}>
                         <IoIosAddCircle />
                    </button>
               </HeadLessTippy>
          </>
     );
}

HandleAddTrackToArtist.propTypes = {
     artistId: PropTypes.string.isRequired,

};

export default HandleAddTrackToArtist;
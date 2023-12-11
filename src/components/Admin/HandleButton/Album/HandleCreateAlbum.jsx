import HeadLessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';

import "tippy.js/dist/tippy.css";

function HandleCreateAlbum() {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [message, setMessage] = useState('');
     const [artist, setArtist] = useState([]);
     const [albumData, setAlbumData] = useState({
          name: '',
          genre: '',
          image: null,
     });

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = useCallback(() => {
          setIsModalOpen(false);
          setAlbumData({
               name: '',
               song: '',
               image: null,
               releaseDate: '',
               duration: '',

          });
          setMessage('');
     }, []);

     const handleBlur = () => {
          closeModal();
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target
          setAlbumData({
               ...albumData,
               [name]: value
          })
     }
     const handleFileChange = (e) => {
          const file = e.target.files[0];
          setAlbumData({
               ...albumData,
               image: file,
          });
     };
     const handleCreate = async (e) => {
          e.preventDefault();
          if (!albumData.name) {
               return setMessage("Please Title in the input");
          }

          if (!albumData.image) {
               return setMessage("Please upload a Image.");
          }
          try {
               const formData = new FormData();
               formData.append('name', albumData.name);
               formData.append('song', albumData.song);
               formData.append('releaseDate', albumData.releaseDate);
               formData.append('duration', albumData.duration);
               formData.append('artist', albumData.artist);
               formData.append('image', albumData.image);
               await axios.post('http://localhost:8000/album/create_album', formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                    },
               });

               toast.success('Album create successfully ', {
                    position: toast.POSITION.TOP_RIGHT,
               })
          } catch (error) {
               console.error('Error creating artist:', error);
               toast.error(`Error creating artist: ${error.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
               });

          }

     }

     const handleArtistChange = (e) => {
          const selectedArtistId = e.target.value;
          setAlbumData({
               ...albumData,
               artist: selectedArtistId,
          });
     };

     useEffect(() => {
          const artistData = async () => {
               try {
                    const res = await axios.get('http://localhost:8000/artist/get_all_artist');
                    const result = res.data;

                    setArtist(result.items);
               } catch (error) {
                    console.log("🚀 CreateButton.jsx:94 ~ artistData ~ error:", error);
               }
          };
          artistData();
     }, []);



     return (
          <>
               <HeadLessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[0, -120]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1" {...attrs} className="relative bg-[#131313f7] w-[550px] rounded-[10px] ">
                              <button onClick={closeModal} className="w-full flex items-center justify-center ">
                                   <IoIosCloseCircleOutline className=" absolute top-0 right-0 text-[30px] font-bold text-[#e30000c0] hover:text-[#f32c2c] " />
                              </button>
                              <h3 className="text-white font-bold mt-[20px] text-[24px] text-center mb-[20px] "> Create Album </h3>

                              {message && (
                                   <div className="bg-red-600 mb-[32px] justify-center rounded-[6px] h-[50px] flex items-center text-[14px] font-semibold text-white ">
                                        {message}
                                   </div>
                              )}

                              <div className="w-full max-w-[600px]">
                                   <form onSubmit={handleCreate} className="rounded-[5px] shadow-md px-8 pt-6 pb-8 mb-4">
                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Name Artist</label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="name"
                                                  type="text"
                                                  value={albumData.name}
                                                  onChange={handleInputChange}
                                                  placeholder="Name Artist"
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Duration </label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="duration"
                                                  type="text"
                                                  value={albumData.duration}
                                                  onChange={handleInputChange}
                                                  placeholder="Duration"
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Song</label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="song"
                                                  type="text"
                                                  value={albumData.song}
                                                  onChange={handleInputChange}
                                                  placeholder="Song"
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Release Date</label>
                                             <input
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="releaseDate"
                                                  type="text"
                                                  value={albumData.releaseDate}
                                                  onChange={handleInputChange}
                                                  placeholder="Release Date"
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Artist</label>
                                             <select
                                                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                  name="artist"
                                                  onChange={handleArtistChange}
                                                  value={albumData.artist || ''}
                                             >
                                                  <option value='' disabled={!albumData.artist}>Select an artist</option>
                                                  {artist.map((artist) => (
                                                       <option key={artist._id} value={artist._id}>
                                                            {artist.name}
                                                       </option>
                                                  ))}
                                             </select>
                                        </div>


                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Image</label>
                                             <input
                                                  name="image"
                                                  accept="image/png, image/jpg, image/jpeg"
                                                  className="shadow appearance-none text-white border border-red-500 rounded w-full py-2 px-3  mb-3 "
                                                  type="file"
                                                  onChange={handleFileChange}
                                                  placeholder="image"
                                             />
                                        </div>
                                        <div className="flex items-center  justify-between">
                                             <button
                                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                                  type="submit"
                                             >
                                                  Create
                                             </button>
                                        </div>
                                   </form>
                              </div>
                         </div>
                    )}
               >
                    <div className="mb-[20px] z-30 relative " >
                         <button onClick={openModal} className="text-white bg-blue-500 w-full max-w-[150px] h-[40px] hover:bg-blue-600">
                              Create Album
                         </button>
                    </div>
               </HeadLessTippy>
          </>
     );
}

export default HandleCreateAlbum;

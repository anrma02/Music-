import HeadLessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { toast } from 'react-toastify';



function HandleCreateArtist() {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [message, setMessage] = useState('');
     const [artistData, setArtistData] = useState({
          name: '',
          genre: '',
          image: null,
     });

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = useCallback(() => {
          setIsModalOpen(false);
          setArtistData({
               name: '',
               genre: '',
               image: null,
          });
          setMessage('');
     }, []);

     const handleBlur = () => {
          closeModal();
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target
          setArtistData({
               ...artistData,
               [name]: value
          })
     }
     const handleFileChange = (e) => {
          const file = e.target.files[0];
          setArtistData({
               ...artistData,
               image: file,
          });
     };
     const handleCreate = async (e) => {
          e.preventDefault();
          if (!artistData.name) {
               return setMessage("Please Title in the input");
          }

          if (!artistData.genre) {
               return setMessage("Please Genre in the input");
          }
          if (!artistData.image) {
               return setMessage("Please upload a Image.");
          }
          try {
               const formData = new FormData();
               formData.append('name', artistData.name);
               formData.append('genre', artistData.genre);
               formData.append('image', artistData.image);

               const response = await axios.post('http://localhost:8000/artist/create_artist', formData, {
                    headers: {
                         'Content-Type': 'multipart/form-data',
                    },
               });

               console.log("🚀 ~ file: apiRespuest.jsx:22 ~ createArtist ~ response:", response);


               toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
               })
          } catch (error) {
               console.error('Error creating artist:', error);
               toast.error(`Error creating artist: ${error.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
               });

          }

     }





     return (
          <>
               <HeadLessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[10, 0]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1" {...attrs} className="relative bg-[#131313f7] w-[550px] rounded-[10px] ">
                              <button onClick={closeModal} className="w-full flex items-center justify-center ">
                                   <IoIosCloseCircleOutline className=" absolute top-0 right-0 text-[30px] font-bold text-[#e30000c0] hover:text-[#f32c2c] " />
                              </button>
                              <h3 className="text-white font-bold mt-[20px] text-[24px] text-center mb-[20px] "> Create Track </h3>

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
                                                  value={artistData.name}
                                                  onChange={handleInputChange}
                                                  placeholder="Name Artist"
                                             />
                                        </div>

                                        <div className="mb-6">
                                             <label className="block text-white text-sm font-bold mb-2">Genre</label>
                                             <input
                                                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                                  type="text"
                                                  name="genre"
                                                  value={artistData.genre}
                                                  onChange={handleInputChange}
                                                  placeholder="Genre"
                                             />
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
                         <button onClick={openModal} className="text-white bg-blue-500 w-full max-w-[150px] h-[40px] hover:bg-blue-600">Create Artist</button>
                    </div>
               </HeadLessTippy>
          </>
     );
}

export default HandleCreateArtist;

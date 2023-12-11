import HeadLessTippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useState } from 'react';
import { IoIosAddCircle, IoIosCloseCircleOutline } from 'react-icons/io';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';



function AddLyricToTrack({ trackId }) {
     const [title, setTitle] = useState('');
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [message, setMessage] = useState('');

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = () => {
          setIsModalOpen(false);

     };

     const handleBlur = () => {
          closeModal();
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (!title) {
               return setMessage('Please Lyric a title');
          }

          try {
               const titlesArray = title.split('\n').filter(Boolean);
               await axios.post(
                    'http://localhost:8000/track/create_lyric',
                    {
                         title: titlesArray,
                         trackId: trackId,
                    },
                    {
                         headers: {
                              'Content-Type': 'application/json',
                         },
                    }
               );

               toast.success('Lyric has been successfully created and added to the track!', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
               });

               setTitle(''); // Clear the textarea
               closeModal();
          } catch (error) {
               console.error('Error creating lyric:', error.response.data);
               toast.error('Error creating lyric', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
               });
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
                    offset={[0, 500]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1" {...attrs} className="relative bg-slate-400 w-[550px] rounded-[10px] h-[450px] ">
                              <button onClick={closeModal} className="w-full flex items-center justify-center ">
                                   <IoIosCloseCircleOutline className=" absolute top-0 right-0 text-[30px] font-bold text-[#e30000c0] hover:text-[#f32c2c] " />
                              </button>
                              {message && (
                                   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                        {message}
                                   </div>
                              )}
                              <form onSubmit={handleSubmit} className="w-full max-w-[550px] mt-[30px]  ">
                                   <label htmlFor="message" className="block mb-2 text-[18px] font-bold text-gray-700 text-center dark:text-white">
                                        Create Lyric
                                   </label>
                                   <textarea
                                        id="message"
                                        rows="4"
                                        className="block p-2.5 w-full text-[16px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write your thoughts here..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                   />
                                   <div className="flex mt-[10px] items-center justify-between">
                                        <button
                                             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                             type="submit">
                                             Create
                                        </button>
                                   </div>
                              </form>
                         </div>
                    )}
               >
                    <button onClick={openModal}>
                         <IoIosAddCircle />
                    </button>
               </HeadLessTippy>
          </>
     );
}

AddLyricToTrack.propTypes = {
     trackId: PropTypes.string.isRequired,
};

export default AddLyricToTrack;
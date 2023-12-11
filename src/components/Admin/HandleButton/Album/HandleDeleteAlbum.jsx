import HeadlessTippy from '@tippyjs/react/headless';
import { useCallback, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';


import "tippy.js/dist/tippy.css";

function HandleDeleteAlbum({ albumId, albumName, onDelete }) {
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = useCallback(() => {
          setIsModalOpen(false);
     }, []);

     const handleBlur = () => {
          closeModal();
     };



     const handleDelete = () => {
          onDelete(albumId);
          closeModal();
     };

     return (
          <>
               <HeadlessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[-100, -150]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1" {...attrs} className="relative bg-[#868383e3] drop-shadow-2xl   w-[550px] rounded-[10px]">

                              <p className='text-[18px] font-bold text-white text-center p-5 '>Delete Album: {albumName}</p>
                              <div className="flex justify-end mt-4">
                                   <button className="mr-2 text-white w-[100px] h-[50px] rounded-[10px] bg-[#14a035fb] hover:bg-[#14a035c6] " onClick={handleDelete}>
                                        Delete
                                   </button>
                                   <button className="mr-2 text-white w-[100px] h-[50px] rounded-[10px] bg-[#c5271cfb] hover:bg-[#973636ec] " onClick={closeModal}>
                                        Cancel
                                   </button>
                              </div>
                         </div>
                    )}
               >
                    <button onClick={openModal}>
                         <MdDelete />
                    </button>
               </HeadlessTippy>
          </>
     );
}

HandleDeleteAlbum.propTypes = {
     albumId: PropTypes.string.isRequired,
     albumName: PropTypes.string.isRequired,
     onDelete: PropTypes.func.isRequired,
};


export default HandleDeleteAlbum;

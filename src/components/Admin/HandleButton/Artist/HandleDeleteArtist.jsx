import HeadlessTippy from '@tippyjs/react/headless';
import { useCallback, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import PropTypes from 'prop-types';


import "tippy.js/dist/tippy.css";

function HandleDeleteArtist({ artistId, artistName, onDelete }) {
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
          onDelete(artistId);
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
                    offset={[100, 400]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1" {...attrs} className="relative bg-[#868383e3] drop-shadow-2xl w-[550px] rounded-[10px]">

                              <p className='text-[18px] font-bold text-white text-center p-5 '>Delete Track: {artistName}</p>
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

HandleDeleteArtist.propTypes = {
     artistId: PropTypes.string.isRequired,
     artistName: PropTypes.string.isRequired,
     onDelete: PropTypes.func.isRequired,
};


export default HandleDeleteArtist;

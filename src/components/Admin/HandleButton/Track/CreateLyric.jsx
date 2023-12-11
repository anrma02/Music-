import HeadLessTippy from '@tippyjs/react/headless'
import { useState } from 'react';
import { IoIosCreate } from 'react-icons/io';


function CreateLyric() {
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => {
          setIsModalOpen(true);
     };

     const closeModal = () => {
          setIsModalOpen(false);
     };

     const handleBlur = () => {
          closeModal();
     };


     return (
          <>
               <HeadLessTippy
                    visible={isModalOpen}
                    onClickOutside={handleBlur}
                    interactive={true}
                    placement="auto"
                    maxWidth={600}
                    offset={[150, 400]}
                    appendTo={() => document.body}
                    render={(attrs) => (
                         <div tabIndex="-1"{...attrs}></div>
                    )}
               >
                    <button onClick={openModal}>
                         <IoIosCreate />
                    </button>
               </HeadLessTippy>

          </>

     );

}
export default CreateLyric;
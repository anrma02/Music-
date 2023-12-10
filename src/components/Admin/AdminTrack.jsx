
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { IoIosAddCircle } from "react-icons/io";


import "react-toastify/dist/ReactToastify.css";
import './HandleButton/admin.scss'
import Image from "~/assest/image";
import CreateTrack from "./HandleButton/Track/CreateTrack";
import UpdateButton from "./HandleButton/Track/UpdateTrack";
import DeleteTrack from "./HandleButton/Track/DeleteTrack";
import { deleteTrack } from "~/redux/Services/apiRespuest";


const baseUrl = 'http://localhost:8000/';

function AdminTrack() {
     const [page, setPage] = useState(1);
     const [track, setTrack] = useState([]);
     const [totalPages, setTotalPages] = useState(0);

     const trackData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/track/get_track?page=${page}`);
               const result = res.data;
               setTrack(result.items);
               setTotalPages(result.totalPages);
          } catch (error) {
               console.log("🚀 trackData ~ error:", error);
          }
     }, [page]);

     const handlePagination = (newPage) => {
          if (newPage > 0 && newPage <= totalPages) {
               setPage(newPage);
          }
     };

     const generatePageNumbers = () => {
          const totalPagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

          const getPageNumbersToRender = () => {

               const startPage = Math.max(1, page - 1);
               const endPage = Math.min(page + 1, totalPages);
               const isStartTruncated = startPage > 2;
               const isEndTruncated = endPage < totalPages - 1;

               let pageNumbersToRender = totalPagesArray.slice(startPage - 1, endPage);

               if (isStartTruncated) {
                    pageNumbersToRender = [1, '...', ...pageNumbersToRender];
               }

               if (isEndTruncated) {
                    pageNumbersToRender = [...pageNumbersToRender, '...', totalPages];
               }

               return pageNumbersToRender;
          };

          return getPageNumbersToRender().map((pageNumber) => (
               <div key={pageNumber} className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                    <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                         <div

                              className={` relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${pageNumber === '...' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                              onClick={() => handlePagination(pageNumber)}
                         >
                              {pageNumber}
                         </div>
                    </div>
               </div>
          ));
     };

     const handleUpdateTrack = (updatedTrackData) => {
          const updatedTrackList = track.map((t) =>
               t.id === updatedTrackData.id ? updatedTrackData : t
          );
          setTrack(updatedTrackList);
     };

     const handleDelete = async (trackId) => {
          try {

               const response = await deleteTrack(trackId);

               toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
               });
               console.log('Track deleted successfully');


               trackData();
          } catch (error) {
               console.error('Error deleting track:', error);

               toast.error('Error deleting track. Please try again.');
          }
     };


     useEffect(() => {
          trackData();
     }, [page, trackData]);

     useEffect(() => {

     }, [track]);



     return (
          <>
               <div className="mx-[50px] h-full max-h-[550px]">
                    <ToastContainer />
                    <div className="bg-[#1f1f1f] text-white  grid grid-cols-[50px_minmax(500px,_1000px)_500px_100px] gap-4 px-4 h-[50px] items-center text-[18px] rounded-[5px] mb-[20px] font-bold ">
                         <div className="">#</div>
                         <div>Title</div>
                         <div>Album</div>

                         <div className="hover:bg-sky-400  h-full rounded-[5px] flex justify-center ">
                              <CreateTrack />
                         </div>

                    </div>
                    {track.map((item, index) => (
                         <div className=' grid grid-cols-[50px_minmax(500px,_1000px)_500px_150px] gap-4' key={index.id}>
                              <div className={'flex text-[17px] text-[#b3b3b3]'}>
                                   {index + 1}
                              </div>
                              <>
                                   <div className={'flex'}>
                                        <Image
                                             className={'w-[40px] h-[40px]'}
                                             src={baseUrl + item.image.path}
                                             alt={item.name}
                                        />
                                        <div className={'ml-[16px]'}>
                                             <div className={'flex items-center w-[250px] overflow-auto font-semibold text-white '}>
                                                  <span>{item.name}</span>
                                             </div>
                                             <span>
                                                  <span className={'flex items-center text-[12px] text-[#dedede] font-medium hover:decoration-solid'}>
                                                       {item.artist?.name}
                                                  </span>
                                             </span>
                                        </div>
                                   </div>
                              </>
                              <div className="flex text-[#B3B3B3] font-medium">{item.album[0]?.name ?? item.name}</div>
                              <div className="flex justify-end w-[130px] text-[#B3B3B3] font-medium">
                                   <div className="add">

                                        <DeleteTrack trackId={item._id} trackName={item.name} onDelete={handleDelete} />

                                        <button>
                                             <IoIosAddCircle />
                                        </button>
                                        <UpdateButton trackId={item._id} onUpdate={handleUpdateTrack} />

                                        <button>
                                        </button>

                                   </div>
                              </div>
                         </div >
                    ))
                    }
                    <div className="text-white grid grid-cols-3 justify-center justify-items-center mt-[30px]   ">
                         <button
                              className={`min-w-[100px] p-2 border border-gray-300 bg-[#00a9d6] text-[18px] rounded-[20px] h-[40px] flex items-center justify-center hover:bg-[#2b79b4fb] ${page === 1 ? 'cursor-not-allowed bg-black' : 'cursor-pointer'
                                   }`}
                              disabled={page === 1}
                              onClick={() => handlePagination(page - 1)}
                         >
                              <p>Previous</p>
                         </button>

                         <div className="flex">
                              {generatePageNumbers()}
                         </div>

                         <button
                              className={`min-w-[100px] p-2 border border-gray-300 bg-[#00a9d6] text-[18px] rounded-[20px] h-[40px] flex items-center justify-center hover:bg-[#2b79b4fb] ${page === totalPages ? 'cursor-not-allowed bg-black' : 'cursor-pointer'
                                   }`}
                              disabled={page === totalPages}
                              onClick={() => handlePagination(page + 1)}
                         >
                              Next
                         </button>
                    </div>
               </div >
          </>
     );
}

export default AdminTrack;
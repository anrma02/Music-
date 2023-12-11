import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";

import style from "./Detail.module.scss";
import Image from "~/assest/image";

const baseUrl = 'http://localhost:8000/';

const cx = classNames.bind(style);

function millisecondsToMinutesAndSeconds(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes} minute ${(seconds)} second `;
}

function formatTimeComponent(timeComponent) {
     return timeComponent.toString().padStart(2, '0');
}

function millisecondsToMinutesAndSeconds1(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes}:${formatTimeComponent(seconds)}`;
}


function AlbumDetail() {
     const [album, setAlbum] = useState(null);
     const { id } = useParams();


     const fetchAlbumData = useCallback(async () => {
          try {
               const response = await axios.get(`http://localhost:8000/album/get_album_by_id/${id}`);
               const result = response.data.items;

               console.log("🚀 ~ file: DetailPage.jsx:56 ~ fetchAlbumData ~ result:", result);

               setAlbum(result);
          } catch (error) {
               console.log("Error fetching Album data:", error);
          }
     }, [id]);


     useEffect(() => {
          fetchAlbumData();
     }, [fetchAlbumData]);

     return (
          < >
               {album && (
                    <>
                         <div className={cx("detail")}>
                              <div className={cx("detail_header")}>
                                   <div className={cx("flex self-end flex-shrink-0 z-0")}>
                                        <Image className={cx("image")} src={baseUrl + album?.image?.path} alt={album.name} />

                                        <div className={cx("flex flex-1 flex-col flex-nowrap justify-end z-0")}>
                                             <span className={cx('title')}>
                                                  <h1 >{album.name}</h1>
                                             </span>
                                             <div className={cx('flex mt-10 items-center text-[14px] ')}>
                                                  <Image className={cx("w-10 rounded-full mr-[10px]")} src={baseUrl + album.artist?.image?.path} />
                                                  <span className={cx("mr-[10px] font-bold hover:underline ")}>
                                                       <Link to={`/detail/artist/${album.artist?._id}`}>
                                                            {album.artist.name}
                                                       </Link>

                                                  </span>
                                                  <div className={cx('mr-[10px] font-normal ')}>
                                                       <span > {album.releaseDate}</span>
                                                       <span> {album.song} songs</span>,
                                                       <span> {millisecondsToMinutesAndSeconds(album.duration)} </span>
                                                  </div>

                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className={cx('detail-main')}>
                                   <div className={cx("flex w-[100px]  justify-between")}>
                                        <button className={cx("icon-play")} >
                                             <FontAwesomeIcon icon={faPlay} className="text-black" />
                                        </button>
                                        <button className={cx("icon-heart")}  >
                                             <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                   </div>
                                   <div className={cx('detail-song')}>
                                        <div className={cx("index")}>#</div>
                                        <div className={cx("Title")}>Title</div>
                                        <div className={cx("Time")}><FontAwesomeIcon icon={faClock} /></div >
                                   </div>

                                   <>
                                        {album.tracks.map((items, index) =>
                                             <div key={index.id} className={cx('grid h-[70px] grid-cols-[40px_minmax(500px,_1fr)_60px] grid-flow-cols gap-4 rounded-[6px]  items-center hover:bg-[#d0d0d019]  hover:delay-100 ')}>
                                                  <div className=" pl-4 ">
                                                       {index + 1}
                                                  </div>
                                                  <div className={cx(" flex items-center  ")}>
                                                       <Image className={'w-[50px]  rounded-[5px] mr-[15px] '} src={baseUrl + items.image?.path} />
                                                       <Link to={`/detail/track/${items._id}`} >
                                                            <span className={cx(" w-full overflow-hidden mt-2 text-[16px] font-medium text-left leading-normal hover:underline")}>
                                                                 {items.name}
                                                            </span>
                                                       </Link>
                                                  </div>
                                                  <div className={cx()}>
                                                       <span className=" ">
                                                            {millisecondsToMinutesAndSeconds1(items.duration)}
                                                       </span>
                                                  </div>
                                             </div>

                                        )}
                                   </>

                              </div>
                         </div>

                    </>

               )
               }</>


     );
}

export default AlbumDetail;
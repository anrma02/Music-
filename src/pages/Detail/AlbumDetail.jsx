import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import style from "./DetailPage.module.scss";
import Image from "~/assest/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";

const baseUrl = 'http://localhost:8000/';

const cx = classNames.bind(style);

function millisecondsToMinutesAndSeconds(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes} minute ${(seconds)}second `;
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

     const { id } = useParams();
     const [track, setTrack] = useState(null);

     const trackData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/album/get_album_by_id/${id}`);

               const result = res.data.items
               console.log("🚀 AlbumDetail.jsx:13 result:", result);
               setTrack(result);

          } catch (error) {
               console.log("🚀error:", error);
          }
     }, [id]);


     useEffect(() => {

          trackData();
     }, [trackData]);

     return (
          < >
               {track && (
                    <>
                         <div className={cx("detail")}>
                              <div className={cx("detail_header")}>
                                   <div className={cx("flex self-end flex-shrink-0 z-0")}>
                                        {/* <Image className={cx("image")} src={baseUrl + track.image.path} alt={track.name} /> */}
                                        <div className={cx("flex flex-1 flex-col flex-nowrap justify-end z-0")}>
                                             <span className={cx('title')}>
                                                  <h1 >{track.name}</h1>
                                             </span>
                                             <div className={cx('flex mt-10')}>
                                                  {/* <Image className={cx("w-10 rounded-full mr-[10px]")} src={baseUrl + track.artist[0].image.path} /> */}
                                                  <span className={cx("mr-[10px] font-bold hover:decoration-slice")}>

                                                  </span>
                                                  <span>{millisecondsToMinutesAndSeconds(track.duration)} </span>
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

                                   <div className={cx('detail--song')}>
                                        {/* <div className={cx("index")}>{track + 1}</div> */}
                                        <div className={cx("Title")}>{track.name}</div>
                                        <div className={cx("Time")}>{millisecondsToMinutesAndSeconds1(track.duration)}</div>
                                   </div>
                              </div>
                         </div>

                    </>

               )
               }
          </>
     );
}

export default AlbumDetail;

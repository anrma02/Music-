import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";

import style from "./DetailPage.module.scss";
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

function DetailPage() {
     const { id } = useParams();
     const [track, setTrack] = useState(null);
     const [album, setAlbum] = useState(null);

     const fetchTrackData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/track/get_track_by_id/${id}`);
               const result = res.data.items;

               console.log("🚀 ~ file: DetailPage.jsx:43 ~ fetchTrackData ~ result:", result);

               setTrack(result);
          } catch (error) {
               console.log("Error fetching track data:", error);
          }
     }, [id]);

     const fetchAlbumData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/album/get_album_by_id/${id}`);
               const result = res.data.items;

               console.log("🚀 ~ file: DetailPage.jsx:56 ~ fetchAlbumData ~ result:", result);

               setAlbum(result);
          } catch (error) {
               console.log("Error fetching Album data:", error);
          }
     }, [id]);

     useEffect(() => {
          fetchTrackData();
     }, [fetchTrackData]);

     useEffect(() => {
          fetchAlbumData();
     }, [fetchAlbumData]);


     return (
          < >
               {track && (
                    <>
                         <div className={cx("detail")}>
                              <div className={cx("detail_header")}>
                                   <div className={cx("flex self-end flex-shrink-0 z-0")}>
                                        <Image className={cx("image")} src={baseUrl + track.image.path} alt={track.name} />
                                        <div className={cx("flex flex-1 flex-col flex-nowrap justify-end z-0")}>
                                             <span className={cx('title')}>
                                                  <h1 >{track.name}</h1>
                                             </span>
                                             <div className={cx('flex mt-10')}>
                                                  <Image className={cx("w-10 rounded-full mr-[10px]")} src={baseUrl + track.artist[0].image.path} />
                                                  <span className={cx("mr-[10px] font-bold hover:decoration-slice")}>
                                                       <Link to={`/detail/artist/${track.artist[0]._id}`}>
                                                            {track.artist[0].name}
                                                       </Link>
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

                                        <div className={cx('detail--song')}>

                                             <div className={cx("Title")}>

                                                  <Link to={`/detail/track/${album.tracks[0]._id}`} >
                                                       <span className={cx(" w-full overflow-hidden mt-2 text-left leading-normal hover:underline")}>{album.tracks[0].name}</span>
                                                  </Link>
                                                  <span
                                                       className="grid text-[12px] mt-[3px] ">{album.artist.name}</span>
                                             </div>
                                             <div className={cx("Time")}><span className=" ">{millisecondsToMinutesAndSeconds1(album.tracks[0]?.duration)}</span>

                                             </div>
                                        </div>
                                   </div>
                              </div>

                         </>

                    )
                    }</>

          </>
     );
}

export default DetailPage;

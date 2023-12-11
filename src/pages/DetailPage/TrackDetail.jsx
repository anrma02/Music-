
import axios from "axios";
import classNames from "classnames/bind";
import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";

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

function TrackDetail() {
     const { id } = useParams();
     const [track, setTrack] = useState(null);

     const fetchTrackData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/track/get_track_by_id/${id}`);
               const result = res.data.items;
               console.log("🚀 fetchTrackData ~ result:", result);

               if (result.artist) {

                    const trackPromises = (result.artist[0]?.tracks || []).map(async (trackId) => {
                         const trackRes = await axios.get(`${baseUrl}track/get_track_by_id/${trackId}`);
                         return trackRes.data.items;
                    });
                    const trackNames = await Promise.all(trackPromises);

                    setTrack({ ...result, trackNames });
               }
          } catch (error) {
               console.log("Error fetching track data:", error);
          }
     }, [id]);

     useEffect(() => {
          fetchTrackData();
     }, [fetchTrackData]);

     return (
          <>
               {track && (
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

                              <div className={cx('ff')}>
                                   <h1>Lyrics</h1>
                                   <div className={cx("aa")}>
                                        <div className={cx("lyric")}>
                                             {
                                                  typeof track.lyrics === 'object' && Array.isArray(track.lyrics[0]?.title)
                                                       ? track.lyrics[0].title.map((line, index) => (
                                                            <span key={index}>
                                                                 {line}
                                                                 {index !== track.lyrics[0].title.length - 1 && <br />}
                                                            </span>
                                                       ))
                                                       : Array.isArray(track.lyrics)
                                                            ? track.lyrics.map((line, index) => (
                                                                 <span key={index}>
                                                                      {line}
                                                                      {index !== track.lyrics.length - 1 && <br />}
                                                                 </span>
                                                            ))
                                                            : track.lyrics?.split('\n').map((line, index) => (
                                                                 <span key={index}>
                                                                      {line}
                                                                      {index !== track.lyrics?.split('\n').length - 1 && <br />}
                                                                 </span>
                                                            ))
                                             }

                                        </div>
                                        <Link className=" h-[100px] hover:bg-[#9b9a9a1f] hover:rounded-[10px]">
                                             <div className={cx('info-artist')}>
                                                  <div  >
                                                       <Image className={cx("w-[80px] mr-[20px]   rounded-full  ")} src={baseUrl + track.artist[0].image.path} />
                                                  </div>

                                                  <div className="flex items-center " >
                                                       <div>
                                                            <p>Artist</p>
                                                            <span> {track.artist[0].name}</span>
                                                       </div>
                                                  </div>
                                             </div>
                                        </Link>


                                   </div>
                              </div>
                              <div >

                                   {track.trackNames.map((items, index) => (
                                        <div key={index} className={cx("detail--song")}>
                                             <div className={cx("index")}> {index + 1}</div>
                                             <div className={cx("Title")}>{items.name}</div>
                                             <div className={cx("Time")}>{millisecondsToMinutesAndSeconds1(items.duration)}</div>
                                        </div>
                                   ))}

                              </div>
                         </div>
                    </div >
               )
               }
          </>
     );
}

export default TrackDetail;
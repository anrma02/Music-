import axios from "axios";
import { useCallback, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames/bind";

import style from "./Detail.module.scss";
import Image from "~/assest/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { useAudio } from "~/Context/AudioProvider";


const cx = classNames.bind(style);
const baseUrl = 'http://localhost:8000/';



function formatTimeComponent(timeComponent) {
     return timeComponent.toString().padStart(2, '0');
}

function millisecondsToMinutesAndSeconds(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes}:${formatTimeComponent(seconds)}`;
}



function ArtistDetail() {

     const { id } = useParams();
     const { playPauseToggle, isPlaying, activeTrackIndex, artist, setArtist } = useAudio();

     const fetchArtistData = useCallback(async () => {
          try {
               const res = await axios.get(`http://localhost:8000/artist/get_artist_by_id/${id}`);
               const results = res.data.items;
               setArtist(results);
          } catch (error) {
               console.log('Error fetching Artist data:', error);
          }
     }, [id, setArtist]);

     useEffect(() => {
          fetchArtistData();
     }, [fetchArtistData]);

     const handlePlay = (url, index) => {
          const track = artist.tracks[index];
          if (track) {
               playPauseToggle(url, index);

          }
     };




     return (
          <>
               {artist && artist.tracks ? (
                    <div className={cx('detail')}>
                         <div className={cx('detail_header')}>
                              <div className={cx('flex self-end flex-shrink-0 z-0 overflow-y-scroll')}>
                                   <Image className={cx('image')} src={baseUrl + artist?.image?.path} alt={artist.name} />
                                   <div className={cx('flex flex-1 flex-col flex-nowrap justify-end z-0  ')}>
                                        <div className="ml-[15px] ">
                                             <span className={cx('title')}>
                                                  <h1>{artist.name}</h1>
                                             </span>
                                             <div className="w-[500px] h-[150px]   overflow-y-auto  ">
                                                  <div className={cx(' whitespace-wrap scroll-smooth  mt-10 items-center text-[14px] overflow-hidden  ')}>
                                                       <span className={cx('text-[16px] ')}>{artist?.information}</span>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className={cx('detail-main')}>
                              <div className={cx('flex w-[100px]  justify-between')}>
                                   <button className={cx('icon-play')} onClick={() => handlePlay(baseUrl + artist?.tracks[0]?.audio?.path, 0)}>
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="text-black" />
                                   </button>

                                   <button className={cx('icon-heart')}>
                                        <FontAwesomeIcon icon={faHeart} />
                                   </button>
                              </div>

                              <div className="my-[30px]  ">
                                   <h1 className="text-[26px] font-bold ">Popular</h1>
                              </div>
                              {artist.tracks && artist.tracks.length > 0
                                   ?
                                   <>
                                        {artist.tracks.map((track, index) => (
                                             <div key={index.id}
                                                  className={cx('grid h-[70px] grid-cols-[40px_minmax(500px,_1fr)_60px] grid-flow-cols gap-4 rounded-[6px]  items-center hover:bg-[#d0d0d019]  hover:delay-100 ')}
                                                  onClick={() => handlePlay(baseUrl + track.audio?.path, index)}>
                                                  <div className="pl-4">{index + 1}</div>
                                                  <div className={cx('flex items-center')}>
                                                       <Image className={'w-[50px]  rounded-[5px] mr-[15px] '} src={baseUrl + track.image?.path} />
                                                       <Link to={`/detail/track/${track._id}`} >
                                                            <span
                                                                 className={cx('w-full overflow-hidden mt-2 text-[16px] font-medium text-left leading-normal hover:underline cursor-pointer', {
                                                                      [' text-green-400']: activeTrackIndex === index,
                                                                 })}
                                                            >
                                                                 {track.name}
                                                            </span>
                                                       </Link>
                                                  </div>
                                                  <div>{millisecondsToMinutesAndSeconds(track.duration)}</div>
                                             </div>
                                        ))}
                                   </>
                                   :
                                   <div>loading</div>
                              }


                              <div className="mt-[40px]  ">
                                   <h1 className="text-[26px] font-bold mb-[20px] ">List of music discs</h1>
                                   <>
                                        <div className=" grid grid-cols-7 grid-flow-row gap-6 ">
                                             {artist.tracks.map((items) =>
                                                  <Link to={`/detail/track/${items._id}`} key={items.id} className="w-full p-3 bg-[#252525d1] rounded-[5px] relative"  >
                                                       <Image className={'w-full  rounded-[5px]  '} src={baseUrl + items.image?.path} />
                                                       <div className="my-[10px] text-center  whitespace-nowrap overflow-hidden w-full">
                                                            <span className="text-ellipsis ">
                                                                 {items.name}
                                                            </span>
                                                       </div>
                                                  </Link>
                                             )
                                             }
                                        </div>

                                   </>


                              </div>
                         </div>

                    </div>
               ) : (
                    <div>loading</div>
               )}

          </>
     );
}

export default ArtistDetail;
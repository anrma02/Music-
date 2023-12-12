import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Image from '~/assest/image';
import { useAudio } from '~/Context/AudioProvider';

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

function TrackItem({ data, index }) {
     const { playPauseToggle, isPlaying } = useAudio();
     const [hoveredIndex, setHoveredIndex] = useState(null);



     return (
          <>
               <div
                    className={`table-grid2 ${hoveredIndex === index ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
               >
                    <div className={'flex text-[17px] text-[#b3b3b3]'}>
                         {hoveredIndex === index ? (
                              <div className={'flex items-center'}>
                                   <Tippy
                                        content={
                                             <div className={'flex items-center text-white text-[14px]'}>
                                                  Play {data?.name} by  {data?.artist && data?.artist.length > 0 ? data.artist[0].name : ''}
                                             </div>
                                        }
                                   >

                                        {isPlaying
                                             ?
                                             <button onClick={playPauseToggle}>
                                                  <FontAwesomeIcon icon={faPause} />
                                             </button>
                                             :
                                             <button onClick={() => playPauseToggle(baseUrl + data.audio.path)} >
                                                  <FontAwesomeIcon icon={faPlay} />
                                             </button>
                                        }
                                   </Tippy>
                              </div>
                         ) : (
                              <> {index + 1} </>
                         )}
                    </div>
                    <>
                         <div className={'flex'}>
                              <Image
                                   className={'w-[40px] h-[40px]'}
                                   src={baseUrl + data.image.path}
                                   alt={data.name}
                              />
                              <div className={'ml-[16px]'}>
                                   <div className={'flex items-center w-[250px] overflow-auto font-semibold text-white '}>
                                        <Link to={`/detail/track/${data._id}`}>  {data?.name}</Link>
                                   </div>
                                   <Link to={`/detail/artist/${data?.artist && data.artist.length > 0 ? data.artist[0]._id : ''}`}>
                                        <span className={'flex items-center text-[12px] text-[#dedede] font-medium hover:decoration-solid'}>
                                             {data?.artist && data.artist.length > 0 ? data.artist[0].name : ''}
                                        </span>
                                   </Link>
                              </div>
                         </div>
                    </>
                    <div className="flex text-[#B3B3B3] font-medium"> {data.album?.name ?? data.name}</div>
                    <div className="flex justify-end w-[130px] text-[#B3B3B3] font-medium">
                         {millisecondsToMinutesAndSeconds(data.duration)}
                    </div>
               </div >
          </>);
}

TrackItem.propTypes = {
     data: PropTypes.object.isRequired,
     index: PropTypes.number,


}

export default TrackItem;
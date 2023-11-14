import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { useState } from 'react';

import Image from '~/assest/image';
import { Link } from 'react-router-dom';

const baseUrl = 'http://localhost:8000/';

function formatTimeComponent(timeComponent) {
     return timeComponent.toString().padStart(2, '0');
}

function millisecondsToMinutesAndSeconds(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes}:${formatTimeComponent(seconds)}  `;
}

function SearchItem({ data, index }) {
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
                                        <FontAwesomeIcon icon={faPlay} />
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
                                   <div className={'flex items-center w-[200px] overflow-auto font-semibold text-white '}>
                                        <Link to={`/detail/${data._id}`}>  {data?.name}</Link>
                                   </div>
                                   <span className={'flex items-center text-[12px] text-[#dedede] font-medium '}>
                                        <Link to={`/detail/${data?.artist[0]._id}`}>  {data?.artist && data?.artist.length > 0 ? data?.artist[0].name : ''}</Link>
                                   </span>
                              </div>
                         </div>
                    </>
                    <div className="flex text-[#B3B3B3] font-medium">{data.album?.name}</div>
                    <div className="flex justify-end w-[130px] text-[#B3B3B3] font-medium">
                         {millisecondsToMinutesAndSeconds(data.duration)}
                    </div>
               </div >
          </>);
}

SearchItem.propTypes = {
     data: PropTypes.object.isRequired,
     index: PropTypes.number,


}

export default SearchItem;
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import Image from '~/assest/image';

import './TabList.scss';
import { SearchContext } from '~/Context/SearchProvider';

const baseUrl = 'http://localhost:5000/';

function formatTimeComponent(timeComponent) {
     return timeComponent.toString().padStart(2, '0');
}

function millisecondsToMinutesAndSeconds(milliseconds) {
     const totalSeconds = Math.floor(milliseconds / 1000);
     const seconds = totalSeconds % 60;
     const minutes = Math.floor(totalSeconds / 60);
     return `${minutes}:${formatTimeComponent(seconds)}  `;
}

function TrackList({ data }) {
     const [hoveredIndex, setHoveredIndex] = useState(null);
     const [isFetching, setIsFetching] = useState(false);
     const { fetchData } = useContext(SearchContext);

     const handleScroll = useContext(function () {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;

          if (windowHeight + scrollTop >= documentHeight - 100 && !isFetching) {
               setIsFetching(true);
          }
     }, []);
     useEffect(() => {
          window.addEventListener('scroll', handleScroll);
          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, [handleScroll]);

     useEffect(() => {
          if (isFetching) {
               fetchData().then(() => {
                    setIsFetching(false);
               });
          }
     }, [isFetching, fetchData]);

     return (
          <div style={{ position: 'sticky', height: '300px', overflowY: 'auto' }}>
               <div className={'px-[15px]'}>
                    {data?.map((item, index) => (
                         <div
                              key={item.id}
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
                                                            Play {item.name} by {item.artist[0]?.name}
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
                                             src={baseUrl + item.image.path}
                                             alt={item.name}
                                        />
                                        <div className={'ml-[16px]'}>
                                             <div className={'flex items-center w-[200px] overflow-auto font-semibold text-white '}>
                                                  {item?.name}
                                             </div>
                                             <span className={'flex items-center text-[12px] text-[#dedede] font-medium '}>
                                                  {item.artist && item.artist.length > 0 ? item.artist[0].name : ''}
                                             </span>
                                        </div>
                                   </div>
                              </>
                              <div className="flex text-[#B3B3B3] font-medium">{item.album?.name}</div>
                              <div className="flex justify-end w-[130px] text-[#B3B3B3] font-medium">
                                   {millisecondsToMinutesAndSeconds(item.duration)}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
}

TrackList.propTypes = {
     data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
     fetchData: PropTypes.func.isRequired, // Function to fetch more data
};

export default TrackList;

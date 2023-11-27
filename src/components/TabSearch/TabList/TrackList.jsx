import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';


import './TabList.scss';

import SearchItem from '~/components/SearchItem';


function TrackList({ data, fetchData }) {

     const [isFetching, setIsFetching] = useState(false);


     const handleScroll = useCallback(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY;

          if (windowHeight + scrollTop >= documentHeight - 100 && !isFetching) {
               setIsFetching(true);
          }

     }, [isFetching]);

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
          <div style={{ position: 'sticky', height: '490px', overflowY: 'auto' }}>
               <div className={'px-[15px]'}>
                    {data?.map((item, index) => (
                         <SearchItem key={item._id} data={item} index={index} />
                    ))}
               </div>
          </div>
     );
}

TrackList.propTypes = {
     data: PropTypes.arrayOf(PropTypes.shape({
          _id: PropTypes.string.isRequired,

     })),
     fetchData: PropTypes.func.isRequired,
};
export default TrackList;

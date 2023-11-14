import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import useDebounce from '~/Hook/useDebounce';

export const SearchContext = React.createContext();

const SearchProvider = ({ children }) => {
     const [searchValue, setSearchValue] = useState('');
     const [searchResults, setSearchResults] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [searchType, setSearchType] = useState([0]);
     const [page, setPage] = useState(1);
     const limit = 10;
     const debounce = useDebounce(searchValue, 500);

     const fetchData = useCallback(
          async function () {
               if (!debounce.trim()) {
                    setSearchResults([]);
                    return;
               }

               setIsLoading(true);

               const options = {
                    method: 'GET',
                    url: 'http://localhost:8000/getMusic/search/',
                    params: {
                         q: debounce,
                         type: searchType,
                         page: page,
                         limit: limit,
                    },
               };

               try {
                    const response = await axios.request(options);
                    const results = response.data?.items ?? [];

                    console.log("🚀 results:", results);

                    // Check if there are more results to fetch
                    if (results.length > 0) {
                         setSearchResults((prevResults) => {
                              if (Array.isArray(prevResults)) {
                                   return [...prevResults, ...results];
                              } else {
                                   return results;
                              }
                         });

                         setPage((prevPage) => prevPage + 1);
                    }

                    setIsLoading(false);
               } catch (error) {
                    setIsLoading(false);
                    console.error('Error fetching data: ', error);
                    setSearchResults(null);
               }
          },
          [debounce, searchType, page]
     );

     const handleScroll = useCallback(() => {
          const isNearBottom =
               window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
          if (isNearBottom) {
               setPage((prevPage) => prevPage + 1);
          }
     }, []);

     useEffect(() => {
          fetchData();
     }, [fetchData]);

     useEffect(() => {
          window.addEventListener('scroll', handleScroll);
          return () => {
               window.removeEventListener('scroll', handleScroll);
          };
     }, [handleScroll]);
     useEffect(() => {
          if (searchValue !== debounce) {
               setPage(1);
          }
     }, [searchValue, debounce]);

     return (
          <SearchContext.Provider
               value={{
                    searchResults,
                    setSearchResults,
                    isLoading,
                    setIsLoading,
                    searchValue,
                    setSearchValue,
                    fetchData,
                    searchType,
                    setSearchType,
               }}
          >
               {children}
          </SearchContext.Provider>
     );
};

SearchProvider.propTypes = {
     children: PropTypes.node.isRequired,
};

export default SearchProvider;

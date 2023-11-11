import axios from 'axios';
import Proptypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import useDebounce from '~/Hook/useDebounce';
export const SearchContext = React.createContext();

function SearchProvider({ children }) {
     const [searchValue, setSearchValue] = useState('');
     const [searchResults, setSearchResults] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const [searchType, setSearchType] = useState([0])

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
                    url: 'http://localhost:5000/getMusic/search/',
                    params: {
                         q: debounce,
                         type: searchType,
                    },

               };

               try {
                    const response = await axios.request(options);
                    const results = response.data?.items ?? [];

                    console.log("🚀 results:", results);


                    setSearchResults(results);
                    setIsLoading(false);
               } catch (error) {
                    setIsLoading(false);
                    console.error("Error fetching data: ", error);
                    setSearchResults(null);
               }

          }, [debounce, searchType]);

     useEffect(() => { fetchData() }, [fetchData, searchType])

     return (<SearchContext.Provider
          value={{
               searchResults,
               setSearchResults,
               isLoading,
               setIsLoading,
               searchValue,
               setSearchValue,
               fetchData,
               searchType,
               setSearchType
          }}>{children}</SearchContext.Provider>);
}

SearchProvider.propTypes = {
     children: Proptypes.node.isRequired
}

export default SearchProvider;
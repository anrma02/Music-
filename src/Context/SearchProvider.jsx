import axios from 'axios';
import Proptypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

import useDebounce from '~/Hook/useDebounce';
export const SearchContext = React.createContext();

function SearchProvider({ children }) {
     const [searchValue, setSearchValue] = useState('');
     const [searchResults, setSearchResults] = useState([]);
     const [isLoading, setIsLoading] = useState(false);
     const debounce = useDebounce(searchValue, 500);


     const fetchData = useCallback(
          async function () {
               if (!debounce.trim()) {
                    setSearchResults([]);
                    return;
               }
               setIsLoading(true);

               try {
                    const response = await axios.get(
                         `http://localhost:5000/getMusic/search?q=${debounce}&type=album`
                    );
                    const result = response.data.items;
                    console.log("🚀 fetchData ~ result:", result);
                    setSearchResults(result);
                    setIsLoading(false);
               } catch (error) {
                    setIsLoading(false);
                    console.error("Error fetching data: ", error);
                    setSearchResults(null);
               }

          }, [debounce]);

     useEffect(() => { fetchData() }, [fetchData])

     return (<SearchContext.Provider
          value={{
               searchResults,
               setSearchResults,
               isLoading,
               setIsLoading,
               searchValue,
               setSearchValue,
               fetchData,
          }}>{children}</SearchContext.Provider>);
}

SearchProvider.propTypes = {
     children: Proptypes.node.isRequired
}

export default SearchProvider;
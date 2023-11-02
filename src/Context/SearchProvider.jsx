import Proptypes from 'prop-types';
import React from 'react';

export const SearchContext = React.createContext();

function SearchProvider({ children }) {


     return (<SearchContext.Provider
          value={{

          }}>{children}</SearchContext.Provider>);
}

SearchProvider.propTypes = {
     children: Proptypes.node.isRequired
}

export default SearchProvider;
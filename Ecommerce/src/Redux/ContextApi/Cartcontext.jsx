import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

 const useSearch = () => useContext(SearchContext);
 export default useSearch

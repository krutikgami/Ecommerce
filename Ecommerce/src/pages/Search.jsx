import React from 'react';
import  useSearch  from '../Redux/ContextApi/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from "react-icons/io5";

function Search() {
  const [value, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/v1/users/search/${value.keyword}`, {
        method: "POST"
      });

      const data = await response.json();
      console.log(data);
      
      if (response.ok) {
        setValues({ ...value, result: data });
        navigate('/search');
      } else {
        console.error(data.message);
        setValues({ ...value, result: [] });
      }
    } catch (error) {
      console.error(error);
      setValues({ ...value, result: [] });
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <input type="search" onChange={(e) => setValues({ ...value, keyword: e.target.value })} value={value.keyword} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products" required />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoSearchOutline /></button>
      </div>
    </form>
  );
}

export default Search;

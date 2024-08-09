import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddToCart } from '../Redux/AddCartSlice';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const location = useLocation();
  const items = location.state?.items || [];
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(AddToCart(item));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="flex flex-wrap gap-2 justify-center">
        {items.map((item, index) => (
          <div key={index} className="relative flex flex-col gap-3 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-lg">
            <div className="relative overflow-hidden cursor-pointer z-5 w-full bg-light-green-700 rounded-md">
              <img src={item.imageurl.url} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="h-18 line-clamp-1 overflow-hidden w-full text-black text-base sm:text-base md:text-base font-medium capitalize">
              {item.title}
            </div>
            <div className="relative overflow-hidden flex flex-col text-black text-sm">
              <ul className="flex flex-wrap items-center gap-1 overflow-hidden whitespace-nowrap">
                {item.sizes.map((size) => (
                  <li key={size} className="list-none">
                    
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4 mt-auto">
              <div className="text-black text-2xl font-bold">${item.price}</div>
              <button
                onClick={() => handleAddToCart(item)}
                className="cursor-pointer flex justify-center items-center gap-1 p-2 w-full bg-[#1675FA] text-white text-sm font-bold border-2 border-gray-600/50 rounded-lg focus:bg-white focus:text-black shadow-inner"
              >
                <svg
                  className="w-4 focus:text-black"
                  stroke="white"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

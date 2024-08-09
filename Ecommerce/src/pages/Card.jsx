import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AddToCart } from '../Redux/AddCartSlice.js';

const Card = () => {
  const [categorizedItems, setCategorizedItems] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/users/fetch-card', {
          method: 'POST',
        });
        if (res.ok) {
          const data = await res.json();
          const items = data.data; 
          
          // Group items by category
          const categorized = items.reduce((acc, item) => {
            (acc[item.category] = acc[item.category] || []).push(item);
            return acc;
          }, {});
          
          setCategorizedItems(categorized);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(AddToCart(item));
  };

  const handleViewAll = (category, items) => {
    navigate(`/category/${category}`, { state: { items } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="grid gap-6 w-full">
        {Object.keys(categorizedItems).length > 0 ? (
          Object.keys(categorizedItems).map((category, index) => (
            <div key={index} className="bg-gray-100 w-full rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {categorizedItems[category]
                  .slice(0, 4) 
                  .map((item, itemIndex) => (
                    <div key={itemIndex} className="bg-white rounded-lg p-4 flex flex-col justify-between">
                      <div>
                        <div className="relative overflow-hidden cursor-pointer z-5 w-full bg-light-green-700 rounded-md">
                          <img src={item.imageurl.url} alt={item.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="text-black text-sm md:text-base font-medium capitalize mt-2 line-clamp-1 overflow-hidden">
                          {item.title}
                        </div>
                        <div className="text-black text-sm mt-2">
                          <ul className="flex flex-wrap gap-1">
                            {item.sizes.map((size) => (
                              <li key={size} className="list-none">
                               
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 mt-4">
                        <div className="text-black text-xl font-bold">${item.price}</div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex justify-center items-center gap-1 p-2 bg-blue-600 text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold border-2 border-gray-600/50 rounded-lg focus:bg-white focus:text-black shadow-inner transition-all duration-300 hover:bg-blue-800"
                        >
                          <svg
                            className="w-3 sm:w-4 md:w-5 lg:w-6"
                            stroke="currentColor"
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
                          <span className="hidden sm:inline">Add to cart</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              {categorizedItems[category].length > 4 && (
                <button
                  onClick={() => handleViewAll(category, categorizedItems[category])}
                  className="mt-4 text-black p-2 px-7 focus:bg-white focus:text-black hover:border-black shadow-2xl bg-white border-2 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg"
                >
                  View All
                </button>
              )}
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Card;

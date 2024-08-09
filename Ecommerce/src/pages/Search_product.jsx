import React from "react";
import useSearch from "../Redux/ContextApi/Cartcontext";
import { AddToCart } from "../Redux/AddCartSlice";
import { useDispatch } from "react-redux";

function SearchProduct() {
  const [values] = useSearch();
  const dispatch = useDispatch();

  console.log(values.result);

  const handleAddToCart = (product) => {
    dispatch(AddToCart(product));
  };

  return (
    <div>
      <h1>Search Result:</h1>
      <h6>{values.result && values.result.data.length < 1 ? "No Products Found" : `Found ${values.result?.data?.length} products`}</h6>
      <div className="flex flex-wrap gap-4 justify-center">
        {values.result?.data?.map((product, index) => (
          <div key={index} className="relative flex flex-col  w-72 bg-gray-100 rounded-lg">
            <div className="relative overflow-hidden cursor-pointer z-5 w-full h-48 bg-light-green-700 rounded-md">
              <img src={product.imageurl?.url} alt={product.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div className="overflow-clip w-full text-black text-lg font-medium capitalize">
              {product.title}
            </div>
            <div className="flex flex-col text-black text-sm">
              <span>Size</span>
              <ul className="flex flex-wrap items-center gap-1 mt-1">
                {product.sizes.map(size => (
                  <li key={size} className="list-none flex">
                    <button className="flex-wrap cursor-pointer p-2 bg-gray-50 text-black text-sm border-2 rounded-md transition-all duration-300 ease-in-out hover:border-black focus:bg-light-green-700 focus:border-light-green-700 focus:shadow-inner">
                      {size}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-black text-2xl font-bold">
                ${product.price}
              </div>
              <button onClick={() => handleAddToCart(product)} className="cursor-pointer flex justify-center items-center gap-1 p-2 w-full bg-[#1675FA] to-gray-300 text-white text-sm font-bold border-2 border-gray-600/50 rounded-lg focus:bg-white focus:text-black shadow-inner">
                <svg className="w-4 focus:text-black" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" strokeLinejoin="round" strokeLinecap="round"></path>
                </svg>
                <span>Add to cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchProduct;

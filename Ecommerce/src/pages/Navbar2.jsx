import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const categories = [
  { name: 'Electronics', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREqEy9J8rWDajvH6Sd7ZjY04ngX-K3oKdTuWRaYP69Z5olVKf7rABwKZqISDjFgGoNrtE&usqp=CAU', subcategories: ['Mobile Phones', 'Laptops', 'Cameras', 'Televisions', 'Audio', 'Accessories'] },
  { name: 'Fashion', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiApGApcSx2d3YyhIqoovsI-_nVPdXhYKQFQ&s', subcategories: ['Men ', 'Women ','Kids', 'Footwear', 'Accessories', 'Jewelry'] },
  { name: 'Home & Garden', image: 'https://png.pngtree.com/png-vector/20201128/ourmid/pngtree-furniture-set-png-image_2420372.jpg', subcategories: ['Furniture', 'Kitchen', 'Decor', 'Gardening', 'Bedding', 'Tools'] },
  { name: 'Grocery', image: 'https://png.pngtree.com/png-vector/20230905/ourmid/pngtree-composition-with-grocery-products-in-shopping-basket-diet-png-image_9948113.png', subcategories: ['Biscuits', 'Chips & Snacks' ,'Tea','Coffee','Noodles & Pasta','Chocolates & Sweets'] },
  { name: 'Appliances', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUb2MnttIjgLENiWTkzXrPhKc0Oc4y0zUZjw&s', subcategories: ['Television', 'Washing Machine','Air Conditioners','Refrigerators', 'Food & Drinks',] },
  { name: 'Health & Beauty', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWqFb7jmlF9BgVzZUjkAKGzKCiF97aeL4Lhw&s', subcategories: ['Skincare', 'Makeup', 'Haircare', 'Personal Care', 'Fragrances', 'Health Devices'] },
  { name: 'Toys & Games', image: 'https://w7.pngwing.com/pngs/715/843/png-transparent-toy-graphy-illustration-toys-daquan-child-baby-photography-thumbnail.png', subcategories: ['Remote Control Toys','Action Figures', 'Board Games', 'Puzzles', 'Educational Toys','Dolls'] },
  { name: 'Sports & Fitness', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWqFb7jmlF9BgVzZUjkAKGzKCiF97aeL4Lhw&s', subcategories: ['Gym Equipment', 'Sports Wear'] },
];

const Navbar2 = () => {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setVisibleIndex(index);
  };

  const handleMouseLeave = () => {
    setVisibleIndex(null);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg mt-5 w-full">
      {/* Large screen layout */}
      <div className="hidden lg:flex justify-between items-center px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group p-2 flex flex-col items-center w-11/12"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <img src={category.image} alt={category.name} className="w-12 h-12 mt-2 object-cover mb-2" />
            <span className="block text-center">{category.name}</span>
            {category.subcategories.length > 0 && visibleIndex === index && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    to={`/subcategory/${subcategory}`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Medium and small screen layout */}
      <div className="lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          // pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 3, spaceBetween: 2 },
            500: { slidesPerView: 3, spaceBetween: 2 },
            640: { slidesPerView: 4, spaceBetween: 2 },
            768: { slidesPerView: 5, spaceBetween: 2 },
            1024: { slidesPerView: 5, spaceBetween: 2 },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="relative group p-2 flex flex-col items-center">
                <img src={category.image} alt={category.name} className="w-12 h-12 mt-2 object-cover mb-2" />
                <span className="block text-center">{category.name}</span>
                {category.subcategories.length > 0 && visibleIndex === index && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-lg duration-300 z-50">
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Link
                        key={subIndex}
                        to={`/subcategory/${subcategory}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Navbar2;

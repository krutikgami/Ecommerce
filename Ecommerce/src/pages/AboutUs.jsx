import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-4 pt-6 mt-10">
      <h1 className="text-5xl font-bold mb-4 text-center text-gray-900">About Us</h1>
      <p className="text-lg mb-4 text-center text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.
      </p>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white rounded shadow-md hover:shadow-lg transition duration-300">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="rounded-full w-32 h-32 object-cover mx-auto mt-4" />
            <h2 className="text-lg font-bold mt-2 text-center text-gray-900">John Doe</h2>
            <p className="text-sm text-center text-gray-600">Founder & CEO</p>
            <p className="text-sm text-center mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex justify-center mt-4 mb-4">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white rounded shadow-md hover:shadow-lg transition duration-300">
            <img src="https://via.placeholder.com/150" alt="Team Member 2" className="rounded-full w-32 h-32 object-cover mx-auto mt-4" />
            <h2 className="text-lg font-bold mt-2 text-center text-gray-900">Jane Doe</h2>
            <p className="text-sm text-center text-gray-600">Co-Founder & CMO</p>
            <p className="text-sm text-center mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex justify-center mt-4 mb-4">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white rounded shadow-md hover:shadow-lg transition duration-300">
            <img src="https://via.placeholder.com/150" alt="Team Member 3" className="rounded-full w-32 h-32 object-cover mx-auto mt-4" />
            <h2 className="text-lg font-bold mt-2 text-center text-gray-900">Bob Smith</h2>
            <p className="text-sm text-center text-gray-600">CTO</p>
            <p className="text-sm text-center mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="flex justify-center mt-4 mb-4">
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-blue-500 hover:text-blue-700 transition duration-300 ml-4">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

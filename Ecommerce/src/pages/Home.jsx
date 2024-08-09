import React, { useState, useEffect } from 'react';

import { Link as ScrollLink, Element, animateScroll as scroll } from 'react-scroll';
import { FaArrowUp } from 'react-icons/fa';

export function Home() {

 

  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    scroll.scrollToTop({ duration: 500 });
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  return (
    <>
      <div className="mx-auto min-w-screen h-screen backdrop-blur-sm">
        <div className="absolute inset-1 min-w-screen h-screen bg-white bg-opacity-10 backdrop-blur-xs"></div>
        <aside className="relative overflow-hidden text-black rounded-lg sm:mx-16 mx-2 sm:py-16">
        
          <div className="relative z-10 max-w-screen-xl px-4 pb-20 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          
            <div className="max-w-xl sm:mt-1 mt-60 space-y-8 text-center sm:text-center">
           
              <h1 className="text-6xl font-bold md:text-6xl">
                Ecommerce<br />
                <span className="text-5xl text-right">Enjoy your buying.</span>
              </h1>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                className="inline-flex text-white items-center px-6 py-3 font-medium bg-orange-700 rounded-lg hover:opacity-75 cursor-pointer"
              >
                Get Started
              </ScrollLink>
            </div>
            
          </div>
        </aside>
      </div>

      <Element name="about">
        <About />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>

     
      <div className={`fixed bottom-8 right-8 z-50 ${showScroll ? 'block' : 'hidden'}`}>
        <FaArrowUp className="text-2xl h-9 w-9 text-white bg-orange-700 p-2 rounded-full hover:bg-orange-900 cursor-pointer" onClick={scrollTop} />
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <div className="py-16 bg-white h-screen " id='about'>
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            {/* <div className="md:5/12 lg:w-5/12">
             <Lottie animationData={About_img}/> 
            </div> */}
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                Secure Examination Paper Distribution.
              </h2>
              <p className="mt-6 text-gray-600">
                <ul className='list-disc text-black'>
                  <li>Digital Delivery</li>
                  <li>Implement secure online portals with access controls.</li>
                  <li>Use one-time passwords and time-limited access for downloads.</li>
                </ul>
              </p>
              <p className="mt-4 text-gray-600">
                While traditional paper-based exams offer a familiar format, they can be vulnerable to leaks and security breaches. Secure websites can offer a viable alternative for distributing exam papers while maintaining integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Contact() {
  return (
    <>
      <div className="relative flex items-top justify-center min-h-[700px] bg-white sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
          <div className="mt-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-100 sm:rounded-lg">
                <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                  Get in touch:
                </h1>
                <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 mt-2">
                  Fill in the form to start a conversation
                </p>
                <div className="flex items-center mt-8 text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    Acme Inc, Street, State, Postal Code
                  </div>
                </div>
                <div className="flex items-center mt-4 text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    +44 1234567890
                  </div>
                </div>
                <div className="flex items-center mt-2 text-gray-600">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="ml-4 text-md tracking-wide font-semibold w-40">
                    info@acme.org
                  </div>
                </div>
              </div>
              <form className="p-6 flex flex-col justify-center">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Full Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="tel" className="hidden">
                    Number
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder="Telephone Number"
                    className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="md:w-32 bg-orange-700 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

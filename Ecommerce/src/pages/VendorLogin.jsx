import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Slide, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function VendorLogin() {
  const [formdata, setFormdata] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value, role: 'vendor' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      setErrormessage(null);

      const res = await fetch('/api/v1/admin/vendor-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      setLoad(false);
      if (res.ok) {
        localStorage.setItem('role', 'vendor');
        toast.success('Login Successfully');
        navigate('/layout');
      } else {
        toast.error('Invalid user credentials!!');
      }
    } catch (error) {
      // setErrormessage(error.message);
      toast.error(error.message);
    }

    if (!formdata.username || !formdata.email || !formdata.password) {
      toast.error("All Fields are required!!");
      // setErrormessage("All Fields are required!!");
    }
  };

  return (
    <>
      <section className="bg-gray-400 min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-6 lg:space-y-0 lg:space-x-6">
        <ToastContainer
              position="bottom-right"
  autoClose={2000}
  hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover={false}
theme="dark"
transition= {Slide}
/>
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in as Vendor
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="abcd01"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black"
                >
                  Sign In
                </button>
                <p className="text-sm w-48  font-light text-gray-500 dark:text-gray-400">
                  Not Admin?{" "} &nbsp;
                  <Link
                    to="/sign-in"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign In As User
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default VendorLogin;

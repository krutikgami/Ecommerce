import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formdata, setFormdata] = useState({});
  const [errormessage, setErrormessage] = useState(null);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, []);

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoad(true);
      setErrormessage(null);

      const res = await fetch('/api/v1/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });

      setLoad(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setLoad(false);
      setErrormessage(error.message);
    }

    if (!formdata.username || !formdata.email || !formdata.password || !formdata.role || !formdata.confirmpassword) {
      return setErrormessage('All Fields Are required');
    } else if (formdata.password !== formdata.confirmpassword) {
      return setErrormessage('Passwords Do not match');
    } else {
      return setErrormessage('User Already Existed');
    }
  };

  return (
    <>
      <section className="bg-gray-200 min-h-screen flex items-center justify-center p-4">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-6 lg:space-y-0 lg:space-x-6">
          <div className="w-full lg:w-1/2 bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="flex items-center space-x-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      id="role"
                      name="role"
                      value="User"
                      className="mr-2"
                      onChange={handlechange}
                      required
                    />
                    User
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <input
                      type="radio"
                      id="role"
                      name="role"
                      value="Vendor"
                      className="mr-2"
                      onChange={handlechange}
                      required
                    />
                    Vendor
                  </label>
                </div>
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="abcd01"
                    required=""
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handlechange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    onChange={handlechange}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                      I accept the{' '}
                      <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/sign-in" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </Link>
                  <Link to="/vendor-login" className="font-medium text-primary-600 hover:underline dark:text-primary-500 ml-16">
                    Vendor Login?
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

export default Signup;

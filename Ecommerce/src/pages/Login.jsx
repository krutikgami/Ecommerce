import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Spinner,Alert} from 'flowbite-react'
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch,useSelector} from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../Redux/userSlice.js'

function Login() {
  const [formdata, setFormdata] = useState({});
  const [Errormessage, setErrormessage] = useState(null);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
 const dispatch = useDispatch();
 const { loading, error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 10000);
  }, []);

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoad(true);
      setErrormessage(null);
      dispatch(signInStart());
      const res = await fetch('/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      setLoad(false);
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));

        localStorage.setItem('token', data.data.token);
        if (data.data.user.role === 'User') {
          localStorage.setItem('role', 'User');
        
          navigate('/');
        } else {
          localStorage.setItem('role', 'Vendor');
          navigate('/Vendor')
        }
        toast.success('Login Successfully');
        
      } else {
        // toast.error('User not found!!');
        setErrormessage('User not found!!');
      }
    } catch (error) {
      setLoad(false);
      setErrormessage(error.message);
      dispatch(signInFailure(error.message));
      // toast.error(error.message);
    }

    if (!formdata.username || !formdata.email) {
      setErrormessage('All Fields are required!!');
      return dispatch(signInFailure('Please fill at the fields'))
      toast.error('All Fields are required!!');
    }
  };

  return (
    <section className="min-h-screen flex bg-gray-200 items-center justify-center p-4 particlesheader">
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
          transition={Slide}
        />
      
        <div className="w-full lg:w-1/2 bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abcd01" required="" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
              </div>
              
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-black"
              disabled={loading}
              >
                 {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className=''>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400 w-full space-x-28">
                Are you an <Link to='/vendor-login' className="font-medium text-primary-600 hover:underline dark:text-primary-500 ">Vendor?</Link> 
               <Link to='/sign-up' className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup?</Link>
              </p>
            </form>
            {Errormessage && <Alert className='text-red-600'> {Errormessage}</Alert>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;

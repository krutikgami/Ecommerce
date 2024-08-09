import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../../Redux/userSlice';
import { RxDashboard } from "react-icons/rx";
import { FaUser, FaPlus, FaList, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(signoutSuccess());
    localStorage.setItem('role','')
    navigate('/sign-in');
  }

  return (
    <aside className="fixed top-0 left-0 text-lg h-screen w-64 bg-[#141428] p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center text-white text-2xl mb-9">
          <RxDashboard className="mr-2" />
          Vendor Dashboard
        </div>
        <ul>
          <li className="mb-9">
            <Link to="/profile" className="flex items-center text-white text-lg hover:text-gray-200">
              <FaUser className="mr-2" />
              Profile
            </Link>
          </li>
          <li className="mb-9">
            <Link to="/Add-product" className="flex items-center text-white text-lg hover:text-gray-200">
              <FaPlus className="mr-2" />
              Add Product
            </Link>
          </li>
          <li className="mb-9">
            <Link to="/product-list" className="flex items-center text-white text-lg hover:text-gray-200">
              <FaList className="mr-2" />
              Product List
            </Link>
          </li>
          <li className="mb-9">
            <Link to="/track-record" className="flex items-center text-white text-lg hover:text-gray-200">
              <FaChartLine className="mr-2" />
              Track Record
            </Link>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <Link to="/sign-in" onClick={handleLogout} className="flex items-center text-white text-lg hover:text-gray-200">
          <FaSignOutAlt className="mr-2" />
          Logout
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;

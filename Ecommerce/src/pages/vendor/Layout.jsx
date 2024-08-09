import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Overview from './Overview';

function Layout (){
  return (
    <>
    <Sidebar />
    <Outlet />
    <Overview />
    {/* <Requests /> */}
    </>
  );
};

export default Layout;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute1 = ({ children, allowedRoles }) => {
  
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser == null ) {
    return <Navigate to="/sign-in" replace />;
  }
  else if(currentUser.data.user.role == 'Vendor' && allowedRoles == ["Vendor"]){
    return <Navigate to="/Vendor" replace />
  }
  return children;
};

export default ProtectedRoute1;

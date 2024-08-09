import './App.css'
import React from 'react'
import Layout from './Layout.jsx'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import ShoppingCart from './pages/ShoppingCart.jsx'
import AboutUs from './pages/AboutUs.jsx'
import SelectedCategory from './pages/Selected_Category.jsx'
import Vendor  from './pages/VendorItem.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
// import VendorLogin from './pages/VendorLogin.jsx'
import ProtectedRoute1 from './context/ProtectedRoute.jsx'
import Layout1  from './pages/vendor/Layout.jsx'
import { useSelector } from 'react-redux'
import ProductList from './pages/vendor/Request.jsx';
import Trackrecord from './pages/vendor/Trackrecord.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import SearchProduct from './pages/Search_product.jsx'
function App() {
  const {currentUser} = useSelector(state => state.user)
 
  
  
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path='/sign-in' element={<Login />} />
    <Route path='/sign-up' element={<Signup />} />
    </Routes>

    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='/search' element={<SearchProduct />} />
      <Route path='cart' element={<ProtectedRoute1 allowedRoles={['User']}><ShoppingCart /></ProtectedRoute1>} />
      <Route path='aboutus' element={<AboutUs/>}/>
     
      {/* <Route path='vendor-login' element={<VendorLogin />} /> */}
      {/* <Route path='contactus' element={</>}/> */}
      <Route path="/subcategory/:name" element={<SelectedCategory />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
    </Routes>

    <Routes>
    <Route path='/Vendor' element={<ProtectedRoute1 allowedRoles={['Vendor']}><Layout1 /></ProtectedRoute1>} />
    <Route path='/Add-product' element={<ProtectedRoute1 allowedRoles={['Vendor']}><Vendor /></ProtectedRoute1>} />
    <Route path='/product-list' element={<ProtectedRoute1 allowedRoles={['Vendor']}><ProductList /></ProtectedRoute1>} />
    <Route path='/track-record' element={<ProtectedRoute1 allowedRoles={['Vendor']}><Trackrecord /></ProtectedRoute1>} />
    </Routes>

    </BrowserRouter>
     
    </>
  )
}

export default App

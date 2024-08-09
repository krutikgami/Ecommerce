import React from 'react';
import Navbar from './pages/Navbar.jsx';
import Footer from './pages/Footer.jsx';
import Card from './pages/Card.jsx';
import InfiniteMovingCards from './pages/Infinite_card.jsx';
import ActiveSlider from './pages/ActiveSlider.jsx';
// import BoxesCore from './pages/Color_tailwind.jsx';
import Navbar2  from './pages/Navbar2.jsx'
// import MarqueeDemoVertical from './pages/Review_card.jsx';
// import Vendor from './pages/VendorItem.jsx'; 
// import Navbar2 from './pages/Navbar2.jsx'
import { useSelector } from 'react-redux'

export default function Layout() {
 

    return (
      <>
        <div className='flex justify-center content-center sticky top-0 z-50 '>
            <Navbar />
            </div>
        
            <div>
            <Navbar2/>
            </div>

           <div className='flex justify-center content-center'>
            <ActiveSlider />
            </div>
    
             <div className='flex justify-center font-bold text-2xl content-center'>
            <Card />
            </div>
         
          <div className='flex justify-center mt-16 content-center'>
            <InfiniteMovingCards />
         </div>
             
          <div className='flex mt-16 justify-center content-center'>
            <Footer />
          </div>
      
        </>
    );
}

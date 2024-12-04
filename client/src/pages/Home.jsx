import React from 'react';
import banner from '../assets/banner.jpg'
import bannerMobile from '../assets/banner-mobile.jpg'
import { useSelector } from 'react-redux';
const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory)
  return (
    <section >
      {/* banner */}
      <div className='container mx-auto bg-black'>
        <div className={`w-full h-full min-h-44 bg-blue-100 rounded ${!banner && 'animate-pulse my-2'} `}>
          <img src={banner}
          className='w-full h-full hidden lg:block'
          alt="banner" />
          <img src={bannerMobile}
          className='w-full h-full lg:hidden'
          alt="bannerMobile" />
        </div>
      </div>
      {/* heading */}
      <div className='container mx-auto px-4 my-2'>
       {
        new Array(20).fill(null).map((_,index) => (
          <div key={index} className='animate-pulse'>
            <div></div>
            <div></div>
            <div>
              <div></div>
              <div></div>
            </div>
          </div>
        ))
       }
      </div>
    </section>
  )
};

export default Home;

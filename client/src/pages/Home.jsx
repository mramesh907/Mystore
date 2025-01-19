import React from 'react';
import banner from '../assets/banner.jpg';
import bannerMobile from '../assets/banner-mobile.jpg';
import { useSelector } from 'react-redux';
import { validUrlConver } from '../utils/validUrlConver.js';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProduct from '../components/CategoryWiseProduct.jsx';
const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector((state) => state.product.allCategory);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const handleRedirectProductListPage = (id,catname) => {
    console.log(id,catname);
    const subcategory = subCategoryData?.find((subCategory) => {
      return subCategory?.category?.some(cat => cat.name === catname)
    });
    const url = `/${validUrlConver(catname)}-${id}/${validUrlConver(subcategory?.name)}-${subcategory?._id}`;
    console.log(url);
    navigate(url)

  };

  return (
    <section>
      {/* banner */}
      <div className='container mx-auto bg-black'>
        <div
          className={`w-full h-full min-h-36 bg-blue-100 rounded ${!banner && 'animate-pulse my-2'} `}>
          <img
            src={banner}
            className='w-full h-full hidden lg:block'
            alt='banner'
          />
          <img
            src={bannerMobile}
            className='w-full h-[30vh] lg:hidden'
            alt='bannerMobile'
          />
        </div>
      </div>
      {/* heading */}
      <div className='container mx-auto px-4 my-2 grid grid-cols-4 md:grid-cols-7 lg:grid-cols-10 gap-2'>
        {loadingCategory
          ? new Array(12).fill(null).map((_, index) => (
              <div
                key={index}
                className='bg-white rounded p-4 min-h-40 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            ))
          : categoryData?.map((category) => {
              return (
                <div
                  key={category?._id}
                  className='w-full h-full cursor-pointer'
                  onClick={() =>
                    handleRedirectProductListPage(category?._id, category?.name)
                  }>
                  <div>
                    <img
                      src={category?.image}
                      alt={category?.name}
                      className='w-full h-full object-scale-down'
                    />
                  </div>
                </div>
              );
            })}
      </div>
      
      {/* category wise product */}
      {
        categoryData.map((category,idx) => {
          return (
            <CategoryWiseProduct key={idx} id={category?._id} name={category?.name} />
          );
        })
      }
     
    </section>
  );
};

export default Home;

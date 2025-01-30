import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi.js';
import CardLoading from './CardLoading.jsx';
import CardProduct from './CardProduct.jsx';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { validUrlConver } from '../utils/validUrlConver.js';

const CategoryWiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const fetchCategoryWiseProduct = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategory,
        data: {
          id: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryWiseProduct();
  }, []);
  const loadingCardNumber = new Array(6).fill(null);
  const handleScrollRight = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft += 200;
    }
  };
  const handleScrollLeft = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= 200;
    }
  };  
  const handleRedirectProductListPage = () => {
    const subcategory = subCategoryData?.find((subCategory) => {
      return subCategory?.category?.some((cat) => cat._id === id);
    });
    const url = `/${validUrlConver(name)}-${id}/${validUrlConver(subcategory?.name)}-${subcategory?._id}`;
    return url
  };
  const redirectURL = handleRedirectProductListPage()
  return (
    <div>
      <div className='container mx-auto px-4 my-2 flex items-center justify-between gap-4'>
        <h3 className='text-lg font-semibold md:text-xl'>{name}</h3>
        <Link
          to={redirectURL}
          className='text-neutral-800 hover:text-green-500'>
          View All
        </Link>
      </div>
      <div className='relative flex items-center'>
        <div
          className='flex gap-4 md:gap-6 lg:gap-8 container mx-auto px-4 overflow-x-scroll scrollbar-none  scroll-smooth'
          ref={containerRef}>
          {loading
            ? loadingCardNumber.map((item, index) => (
                <CardLoading key={index} />
              ))
            : data.map((item, index) => (
                <CardProduct key={index} data={item} />
              ))}
        </div>
        <div className='w-full absolute lg:flex md:flex justify-between max-w-full left-0 right-0 container mx-auto px-2 hidden '>
          <button
            onClick={handleScrollLeft}
            className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'>
            <FaAngleLeft size={25} />
          </button>
          <button
            onClick={handleScrollRight}
            className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100'>
            <FaAngleRight size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProduct;

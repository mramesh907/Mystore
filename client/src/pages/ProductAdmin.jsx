import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummartApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import Axios from '../utils/Axios.js';
import Loading from '../components/Loading.jsx';
import ProductCardAdmin from '../components/ProductCardAdmin.jsx';
import { IoSearchOutline } from 'react-icons/io5';
const ProductAdmin = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0); // Add totalCount state
  const [Search, setSearch] = useState('');

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: {
          page: page,
          limit: 12,
          search: Search,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setProductData(responseData.data);
        setTotalPages(responseData.totalNoPage);
        setTotalCount(responseData.totalCount); // Update totalCount
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProductData();
  }, [page]);

  const handleOnChange = (e) => {
    const { value } = e.target;
    setSearch(value.trimStart());
    setPage(1);
  };

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        fetchProductData();
        flag = false;
      }
    }, 400);

    return () => {
      clearTimeout(interval);
    };
  }, [Search]);

  return (
    <section>
      <div className='p-2 bg-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4'>
        <h1 className='text-2xl font-semibold w-full sm:w-auto'>Products</h1>

        <div className='p-2 w-full sm:w-auto'>
          {totalCount > 0 ? (
            <p className='text-sm font-semibold'>
              Total Products: {totalCount}
            </p>
          ) : (
            !loading && (
              <p className='text-sm font-semibold'>No products available.</p>
            )
          )}
        </div>

        <div className='border focus-within:border-primary-200 bg-blue-50 px-2 py-1 rounded flex items-center gap-3 cursor-pointer max-w-xs w-full sm:w-auto'>
          <IoSearchOutline size={25} />
          <input
            type='text'
            placeholder='Search product here ...'
            className='outline-none bg-transparent w-full'
            value={Search}
            onChange={handleOnChange}
          />
        </div>
      </div>

      {loading && <Loading />}

      <div className='p-4 bg-blue-50'>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {productData && productData.length > 0 ? (
            productData.map((item, index) => (
              <ProductCardAdmin key={index} data={item} />
            ))
          ) : (
            <p className='col-span-full text-center'>No products available</p>
          )}
        </div>
      </div>
      <div className='flex justify-between my-4'>
        <button
          onClick={() => {
            if (page === 1) return;
            setPage(page - 1);
          }}
          className='border border-primary-400 px-4 py-1 hover:bg-primary-400'>
          Previos
        </button>
        <button className='border w-full px-4 py-1 bg-slate-100'>
          {page}/{totalPages}
        </button>
        <button
          onClick={() => {
            if (page === totalPages) return;
            setPage(page + 1);
          }}
          className='border border-secondary-200 px-4 py-1 hover:bg-green-400'>
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductAdmin;

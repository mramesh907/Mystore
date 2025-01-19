import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import Loading from '../components/Loading';
import CardProduct from '../components/CardProduct';
import { useSelector } from 'react-redux';

const ProductListPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const AllSubCategory = useSelector((state) => state.product.allSubCategory);
  const [displaySubCategory, setdisplaySubCategory] = useState([]);
  const subCategory = params?.subCategory?.split('-');
  const subCategoryName = subCategory
    ?.slice(0, subCategory?.length - 1)
    .join(' ');
  const categoryId = params.category.split('-').splice(-1)[0];

  const subCategoryId = params.subCategory.split('-').splice(-1)[0];
  const fetchProductData = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 10,
        },
      });
      const { data: responseData } = response;

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data);
        } else {
          setData([...data, ...responseData.data]);
        }
        setTotalPages(responseData.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);
  useEffect(() => {
    const subCat = AllSubCategory.filter((item) => {
      const filterData = item.category.some((el) => {
        return el._id === categoryId;
      });
      return filterData;
    });
    setdisplaySubCategory(subCat);
  }, [params, AllSubCategory]);

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24  mx-auto grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        {/* Subcategory */}
        <div className='cursor-pointer  min-h-[80vh] max-h-[80vh] overflow-y-scroll lg:py-4 grid gap-1 shadow-md scrollbarCustom sticky top-20 bg-blue-50'>
          {displaySubCategory.map((item) => {
            return (
              
              <Link key={item._id} className={` p-2 w-full 
              hover:bg-blue-200
              cursor-pointer
              ${subCategoryId === item._id ? 'bg-green-100' : ''}
              `}>
                <div className='w-fit mx-auto'>
                  <img
                    src={item.image}
                    className='w-14 h-full object-scale-down'
                    alt={item.name}
                  />
                </div>
                <p className='text-sm text-center'>{item.name}</p>
              </Link>
            );
          })}
        </div>

        {/* Product */}
        <div>
          <div className='bg-white shadow-md p-4'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>
            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4'>
              {data.map((item) => {
                return <CardProduct key={item._id} data={item} />;
              })}
            </div>
            {loading && <Loading />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListPage;

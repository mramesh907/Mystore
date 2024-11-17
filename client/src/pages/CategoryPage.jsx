import React, { useEffect, useState } from 'react';
import UploadCategoryComponent from '../components/UploadCategoryComponent';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
SummaryApi
const CategoryPage = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryData, setcategoryData] = useState([])
  const fetchCategory = async () => {
    try {
      setloading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      if(responseData.success){
        setcategoryData(responseData.data)
      }
      
    } catch (error) {

    } finally {
      setloading(false)
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <section>
      <div className=' p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button
          onClick={() => setopenUploadCategory(true)}
          className='text-sm border border-primary-400 hover:bg-primary-400 px-3 py-1 rounded'>
          Add Category
        </button>
      </div>
      {!categoryData[0] && !loading && <NoData />}

      {/* display category */}
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2'>
        {categoryData.map((category) => {
          return (
            <div
              key={category._id}
              className='w-32 h-48  bg-[#edf4ff] shadow-md rounded'>
              {/* <h3 className='font-semibold'>{category.name}</h3> */}
              <img src={category.image} alt={category.name} className='w-full object-scale-down' />
            </div>
          );
        })}
      </div>
      {loading && <Loading />}

      {openUploadCategory && (
        <UploadCategoryComponent
          fetchData={fetchCategory}
          close={() => setopenUploadCategory(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;

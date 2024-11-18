import React, { useEffect, useState } from 'react';
import UploadCategoryComponent from '../components/UploadCategoryComponent';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import EditCategory from '../components/EditCategory';
import DeleteCategory from '../components/DeleteCategory';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
const CategoryPage = () => {
  const [openUploadCategory, setopenUploadCategory] = useState(false);
  const [loading, setloading] = useState(false);
  const [categoryData, setcategoryData] = useState([]);
  const [openEdit, setopenEdit] = useState(false);
  const [editData, seteditData] = useState({
    name: '',
    image: '',
  });
  const [openDelete, setopenDelete] = useState(false);
  const [deleteCategory, setdeleteCategory] = useState({
    _id:""
  })

  const fetchCategory = async () => {
    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setcategoryData(responseData.data);
      }
    } catch (error) {
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    fetchCategory();
  }, []);

  const handleDeleteCategory = async()=>{
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const {data : responseData} = response
      if(responseData.success){
        toast.success(responseData.message)
        fetchCategory()
        setopenDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }


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
      {/* Category Count Display */}
      <div className='p-2'>
        {categoryData.length > 0 ? (
          <p className='text-sm font-semibold'>
            Total Categories: {categoryData.length}
          </p>
        ) : (
          !loading && (
            <p className='text-sm font-semibold'>No categories available.</p>
          )
        )}
      </div>
      {!categoryData[0] && !loading && <NoData />}

      {/* display category */}
      <div className='p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2'>
        {categoryData.map((category) => {
          return (
            //
            <div
              key={category._id}
              className='w-32 h-52  shadow-md rounded group'>
              {/* <h3 className='font-semibold'>{category.name}</h3> */}
              <img
                src={category.image}
                alt={category.name}
                className='w-full object-scale-down'
              />
              <div className='items-center h-1 hidden group-hover:flex'>
                <button
                  onClick={() => {
                    setopenEdit(true);
                    seteditData(category);
                  }}
                  className='flex-1 bg-green-200 hover:bg-green-300 text-green-500 font-semibold py-1 px-1 ml-1 mb-1 rounded'>
                  Edit
                </button>
                <button
                  onClick={() => {
                    setopenDelete(true);
                    setdeleteCategory(category);
                  }}
                  className='flex-1 bg-red-200 hover:bg-red-300 text-red-500 font-semibold py-1 px-1 ml-1 mr-1 mb-1 rounded'>
                  Delete
                </button>
              </div>
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

      {openEdit && (
        <EditCategory
          data={editData}
          fetchData={fetchCategory}
          close={() => setopenEdit(false)}
        />
      )}
      {openDelete && (
        <DeleteCategory
          close={() => setopenDelete(false)}
          confirm={handleDeleteCategory}
          cancel={() => setopenDelete(false)}
        />
      )}
    </section>
  );
};

export default CategoryPage;

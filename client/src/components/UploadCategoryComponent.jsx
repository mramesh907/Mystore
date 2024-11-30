import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
const UploadCategoryComponent = ({ close, fetchData }) => {
  const [data, setdata] = useState({
    name: '',
    image: '',
  });
  const [loading, setloading] = useState(false);

  // handle change
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const response = await Axios({
        ...SummaryApi.addCategory,
        data: data,
      });
      const { data: responseData } = response;
      console.log('responseData', responseData);

      if (responseData.success) {
        toast.success(responseData.message);
        close();
        fetchData();
      }
    } catch (error) {
      AxiosToastError(error);
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  // handle upload category image
  const handleUploadCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setloading(true);
    const response = await uploadImage(file);
    const { data: ImageRes } = response;
    setloading(false);
    setdata((preve) => {
      return {
        ...preve,
        image: ImageRes.data.url,
      };
    });
  };
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800 bg-opacity-60 flex items-center justify-center'>
      <div className='bg-white max-w-4xl w-full p-4 rounded'>
        <div className='flex items-center justify-between'>
          <h1 className='font-semibold'>Upload Category</h1>
          <button onClick={close} className='w-fit block ml-auto'>
            <IoClose size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className='my-3 grid gap-3'>
          {/* category name */}
          <div className='grid gap-1'>
            <label htmlFor='categoryName'>Name of Category</label>
            <input
              type='text'
              id='categoryName'
              placeholder='Enter Category Name'
              value={data.name}
              name='name'
              onChange={handleOnChange}
              className='bg-blue-50 border border-blue-200 focus-within:border-primary-400 px-2 py-1 rounded outline-none'
            />
          </div>
          {/* display category image */}
          <div className='grid gap-1'>
            <p>Image</p>
            <div className='flex gap-4 flex-col lg:flex-row items-center'>
              <div className='border w-full lg:w-36 h-36 bg-blue-100 flex items-center justify-center rounded'>
                {data.image ? (
                  <img
                    src={data.image}
                    alt={data.name}
                    className='w-full h-full object-scale-down'
                  />
                ) : (
                  <p className='text-sm text-neutral-600'>No Image</p>
                )}
              </div>
              <label htmlFor='uploadCategoryImage'>
                <div
                  className={`
                ${!data.name ? 'bg-gray-400' : 'border border-primary-200 hover:bg-primary-100 cursor-pointer'}
                px-4 py-2 rounded text-black
                font-medium`}>
                  {loading ? 'Loading...' : 'Upload Image'}
                </div>
                <input
                  disabled={!data.name}
                  onChange={handleUploadCategoryImage}
                  type='file'
                  name=''
                  id='uploadCategoryImage'
                  className='hidden'
                />
              </label>
            </div>
          </div>
          {/* add category */}
          <button
            className={`
            ${data.name && data.image ? 'bg-primary-400 cursor-pointer hover:bg-primary-300' : 'bg-gray-400 cursor-auto'}
            py-2 px-4 rounded text-white
            font-semibold
            `}>
            Add Category
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategoryComponent;

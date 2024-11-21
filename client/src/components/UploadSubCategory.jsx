import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage.js';
import { useSelector } from 'react-redux';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummartApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import toast from 'react-hot-toast';

const UploadSubCategory = ({ close,onSuccess }) => {
  const [subCategoryData, setsubCategoryData] = useState({
    name: '',
    image: '',
    category: [],
  });

  const allCategory = useSelector((state) => state.product.allCategory);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setsubCategoryData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadSubCategoryImage = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const response = await uploadImage(file);
    const { data: ImageRes } = response;
    // setloading(false);
    setsubCategoryData((preve) => {
      return {
        ...preve,
        image: ImageRes.data.url,
      };
    });
  };

  const handleRemoveCategorySelected = (categoryId)=>{
    const index = subCategoryData.category.findIndex((item)=>item._id ===categoryId);
    subCategoryData.category.splice(index,1);
    setsubCategoryData({...subCategoryData})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const response = await Axios({
          ...SummaryApi.addSubCategory,
          data: subCategoryData,
        });
        const { data: responseData } = response;
        if (responseData.success) {
          toast.success(responseData.message);
          close();
        }
    } catch (error) {
        return AxiosToastError(error);
    }
  }

  // return
  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
      <div className='w-full max-w-3xl bg-white p-4 rounded-md'>
        {/* header */}
        <div className='flex justify-between items-center gap-3'>
          <h1 className='text-xl font-semibold'>Add Sub Category</h1>
          <button onClick={close}>
            <IoClose size={26} />
          </button>
        </div>
        <form className='flex flex-col gap-3 mt-4' onSubmit={handleSubmit}>
          {/* sub category name */}
          <div className='flex flex-col gap-1'>
            <label htmlFor='name'>Sub Category Name</label>
            <input
              id='name'
              name='name'
              value={subCategoryData.name}
              onChange={handleChange}
              type='text'
              className='w-full p-2 border outline-none border-primary-200 rounded-md bg-slate-50'
            />
          </div>
          {/* sub category image */}
          <div className='flex flex-col gap-1'>
            <p>Sub Category Image</p>
            <div className='flex flex-col gap-3 lg:flex-row items-center'>
              <div className='border  h-36 w-full lg:w-36 bg-blue-50 flex justify-center items-center'>
                {!subCategoryData.image ? (
                  <p className='text-center text-neutral-500'>No Image</p>
                ) : (
                  <img
                    src={subCategoryData.image}
                    alt='subCategoryImage'
                    className='w-full h-full object-scale-down'
                  />
                )}
              </div>
              <label htmlFor='uploadSubCategory'>
                <div className='text-sm border border-primary-400 hover:bg-primary-400 px-3 py-1 rounded-md cursor-pointer'>
                  Upload Image
                </div>
                <input
                  type='file'
                  name=''
                  id='uploadSubCategory'
                  className='hidden'
                  onChange={handleUploadSubCategoryImage}
                />
              </label>
            </div>
          </div>
          {/*  category select box */}
          <div className='grid gap-1'>
            <label>Select Category</label>
            <div className='border focus-within:border-primary-200 rounded'>
              {/*display value**/}
              <div className='flex flex-wrap gap-2'>
                {subCategoryData.category.map((cat, index) => {
                  return (
                    <div
                      key={cat._id + 'selectedValue'}
                      className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                      {cat.name}
                      <div
                        className='cursor-pointer hover:text-red-600'
                        onClick={() => handleRemoveCategorySelected(cat._id)}>
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*select category**/}
              <select
                className='w-full p-2 bg-transparent outline-none border'
                onChange={(e) => {
                  const value = e.target.value;
                  const categoryDetails = allCategory.find(
                    (el) => el._id == value
                  );

                  setsubCategoryData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, categoryDetails],
                    };
                  });
                }}
              >
                <option value={''}>Select Category</option>
                {allCategory.map((category, index) => {
                  return (
                    <option
                      value={category?._id}
                      key={category._id + 'subcategory'}>
                      {category?.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            className={`px-4 py-2 border
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ? 'bg-primary-200 hover:bg-primary-100' : 'bg-gray-200'}    
                            font-semibold
                        `}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadSubCategory;

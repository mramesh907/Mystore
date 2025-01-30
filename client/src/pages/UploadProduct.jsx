import React, { useState } from 'react';
import { IoCloudUploadOutline } from 'react-icons/io5';
import uploadImage from '../utils/UploadImage.js';
import Loading from '../components/Loading.jsx';
import ViewImage from '../components/ViewImage.jsx';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import MoreDetails from '../components/MoreDetails.jsx';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummartApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import toast from 'react-hot-toast';
import SuccessAlert from '../utils/SuccessAlert.js';

const UploadProduct = () => {
  const [imageLoading, setimageLoading] = useState(false);
  const [viewImageUrl, setviewImageUrl] = useState('');
  const allCategory = useSelector((state) => state.product.allCategory);
  const [selectedCategory, setselectedCategory] = useState('');
  const [selectedSubCategory, setselectedSubCategory] = useState('');
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  // const [moreDetails, setmoreDetails] = useState([]);
  const [openMoreDetails, setopenMoreDetails] = useState(false);
  const [fieldName, setfieldName] = useState('');

  const [data, setData] = useState({
    name: '',
    image: [],
    category: [],
    subCategory: [],
    unit: '',
    stock: '',
    price: '',
    discount: '',
    description: '',
    moreDetails: {},
    // publish:true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setimageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageRes } = response;
    const imageUrl = ImageRes.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setimageLoading(false);
  };
  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleDeleteCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleDeleteSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.addProduct,
        data: data,
      })
      const { data: res } = response;
      if (res.error) {
        toast.error(res.message);
      }
      if (res.success) {
        SuccessAlert(res.message);
        setData({
          name: '',
          image: [],
          category: [],
          subCategory: [],
          unit: '',
          stock: '',
          price: '',
          discount: '',
          description: '',
          moreDetails: {},
          // publish:true
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
    
  };
  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        moreDetails: {
          ...preve.moreDetails,
          [fieldName]: '',
        },
      };
    });
    setfieldName('');
    setopenMoreDetails(false);
  };
  return (
    <section>
      <div className=' p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-4'>
        <form onSubmit={handleSubmit} className='grid gap-4'>
          {/* Product Name */}
          <div className='grid gap-1'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              id='name'
              required
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
              placeholder='Enter Product Name'
              onChange={handleChange}
              value={data.name}
            />
          </div>
          {/* Product Description */}
          <div className='grid gap-1'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              id='description'
              required
              multiple
              rows={3}
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded resize-none'
              placeholder='Enter Product Description'
              onChange={handleChange}
              value={data.description}
            />
          </div>
          {/* Product Image */}
          <div>
            <p>Image</p>
            <div>
              <label
                htmlFor='image'
                className='bg-blue-50 h-24 border rounded flex items-center justify-center cursor-pointer hover:bg-blue-100'>
                <div className='flex flex-col items-center text-center'>
                  {imageLoading ? (
                    <Loading />
                  ) : (
                    <>
                      <IoCloudUploadOutline size={30} />
                      <p>Upload Image</p>
                    </>
                  )}
                </div>
                <input
                  type='file'
                  name='image'
                  id='image'
                  className='hidden'
                  accept='image/*'
                  onChange={handleUploadImage}
                />
              </label>
              {/* display images */}
              <div className='grid grid-cols-4 gap-1 mt-2'>
                {data.image.map((image, index) => {
                  return (
                    <div
                      key={image + index}
                      className='flex items-center gap-2 h-20 w-20 min-w-20 bg-blue-100 border relative group'>
                      <img
                        src={image}
                        alt={image}
                        className='w-full h-full object-scale-down cursor-pointer'
                        onClick={() => setviewImageUrl(image)}
                      />
                      <div
                        onClick={() => {
                          handleDeleteImage(index);
                        }}
                        className='absolute top-0 right-0'>
                        <button className='bg-red-500 text-white p-1 rounded-full hover:bg-red-600 hidden group-[&:hover]:block'>
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Product Category */}
          <div className='grid gap-1'>
            <label htmlFor='category'>Category</label>
            <div>
              <select
                name='category'
                id='category'
                value={selectedCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find((cat) => cat._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    };
                  });
                  setselectedCategory('');
                }}
                className='border bg-blue-50 outline-none p-2 w-full focus-within:border-primary-100 rounded'>
                <option value=''>Select Category</option>
                {allCategory.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <div className='flex flex-wrap gap-3'>
                {data.category.map((category, index) => {
                  return (
                    <div
                      key={category._id + index + 'product'}
                      className='flex items-center gap-1 text-sm bg-blue-50 border p-2 mt-2'>
                      <p>{category.name}</p>
                      <div
                        className='hover:text-red-500 cursor-pointer'
                        onClick={() => handleDeleteCategory(index)}>
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Product Sub Category */}
          <div className='grid gap-1'>
            <label htmlFor='subCategory'>Sub Category</label>
            <div>
              <select
                name='subCategory'
                id='subCategory'
                value={selectedSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(
                    (cat) => cat._id === value
                  );

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory],
                    };
                  });
                  setselectedSubCategory('');
                }}
                className='border bg-blue-50 outline-none p-2 w-full focus-within:border-primary-100 rounded'>
                <option value=''>Select Sub Category</option>
                {allSubCategory.map((category) => {
                  return (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <div className='flex flex-wrap gap-3'>
                {data.subCategory.map((category, index) => {
                  return (
                    <div
                      key={category._id + index + 'product'}
                      className='flex items-center gap-1 text-sm bg-blue-50 border p-2 mt-2'>
                      <p>{category.name}</p>
                      <div
                        className='hover:text-red-500 cursor-pointer'
                        onClick={() => handleDeleteSubCategory(index)}>
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Product Unit */}
          <div className='grid gap-1'>
            <label htmlFor='unit'>Unit</label>
            <input
              type='text'
              name='unit'
              id='unit'
              required
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
              placeholder='Enter Product Unit'
              onChange={handleChange}
              value={data.unit}
            />
          </div>
          {/* Product Stock */}
          <div className='grid gap-1'>
            <label htmlFor='stock'>Nuber of Stock</label>
            <input
              type='number'
              name='stock'
              id='stock'
              required
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
              placeholder='Enter Product Stock'
              onChange={handleChange}
              value={data.stock}
            />
          </div> 
          {/* Product Price */}
          <div className='grid gap-1'>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              name='price'
              id='price'
              required
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
              placeholder='Enter Product Price'
              onChange={handleChange}
              value={data.price}
            />
          </div>
          {/* Product Discount */}
          <div className='grid gap-1'>
            <label htmlFor='discount'>Discount</label>
            <input
              type='number'
              name='discount'
              id='discount'
              required
              className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
              placeholder='Enter Product Discount'
              onChange={handleChange}
              value={data.discount}
            />
          </div>
          {/* Add Fields */}
          <div>
            {Object?.keys(data?.moreDetails)?.map((key, index) => {
              return (
                <div className='grid gap-1'>
                  <label htmlFor={key}>{key}</label>
                  <input
                    type='text'
                    id={key}
                    required
                    className='border bg-blue-50 outline-none p-2 focus-within:border-primary-100 rounded'
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((preve) => {
                        return {
                          ...preve,
                          moreDetails: {
                            ...preve.moreDetails,
                            [key]: value,
                          },
                        };
                      });
                    }}
                    value={data?.moreDetails[key]}
                  />
                </div>
              );
            })}
          </div>
          {/* Add Fields Button */}
          <div
            onClick={() => setopenMoreDetails(true)}
            className='inline-block hover:bg-primary-300 bg-white py-1 px-3 w-32 text-center rounded-lg cursor-pointer font-semibold border border-primary-400 hover:text-neutral-900'>
            Add Fields
          </div>
          {/* Submit */}
          <button className='bg-primary-200 text-white px-4 py-2 rounded hover:bg-primary-300'>
            Submit
          </button>
        </form>
      </div>
      {viewImageUrl && (
        <ViewImage url={viewImageUrl} close={() => setviewImageUrl('')} />
      )}
      {openMoreDetails && (
        <MoreDetails
          close={() => setopenMoreDetails(false)}
          value={fieldName}
          onChange={(e) => setfieldName(e.target.value)}
          submit={handleAddField}
        />
      )}
    </section>
  );
};

export default UploadProduct;

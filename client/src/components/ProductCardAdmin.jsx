import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin';
import ConfirmBox from './ConfirmBox';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleDelete = async () => {
    try {      
      const response = await Axios({
        ...SummaryApi.deleteProduct,
        data: { _id: data._id },
      });      
      const { data: responseData } = response;

      if (responseData.success) {
        setOpenDelete(false);
        fetchProductData();
        toast.success(responseData.message);
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error);
    }
  }
  return (
    <div className='w-36 p-4 bg-white rounded shadow-md hover:shadow-xl transition-shadow'>
      <div className='w-full h-45 bg-gray-100 flex items-center justify-center overflow-hidden rounded'>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='w-full h-full object-scale-down'
        />
      </div>
      <p
        className='mt-2 text-sm font-medium text-slate-700 line-clamp-2'
        title={data?.name}>
        {data?.name || 'Unnamed Product'}
      </p>
      <p className='text-xs text-black line-clamp-1'>
        {data?.unit || 'No unit specified'}
      </p>
      <div className='mt-2 flex gap-2'>
        <button
          onClick={() => setEditOpen(true)}
          className='border-green-600 bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200'>
          Edit
        </button>
        <button
        onClick={() => setOpenDelete(true)}
        className='border-red-600 bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200'>
          Delete
        </button>
      </div>
      {editOpen && (
        <EditProductAdmin
          fetchProductData={fetchProductData}
          data2={data}
          close={() => setEditOpen(false)}
        />
      )}
      {
        openDelete && (
          <ConfirmBox
            cancel={() => setOpenDelete(false)}
            confirm={() => handleDelete()}
            close={() => setOpenDelete(false)}
          />
        )
      }
    </div>
  );
};

export default ProductCardAdmin
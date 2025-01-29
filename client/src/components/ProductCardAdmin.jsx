import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin';

const ProductCardAdmin = ({ data, fetchProductData }) => {
  const [editOpen, setEditOpen] = useState(false);
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
        <button className='border-red-600 bg-red-100 text-red-800 px-2 py-1 rounded hover:bg-red-200'>
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
    </div>
  );
};

export default ProductCardAdmin
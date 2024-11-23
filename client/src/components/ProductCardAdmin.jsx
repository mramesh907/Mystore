import React from 'react'

const ProductCardAdmin = ({data}) => {
  return (
    <div className='w-36 p-4 bg-white rounded shadow hover:shadow-xl transition-shadow'>
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
    </div>
  );
}

export default ProductCardAdmin
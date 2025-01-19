import React from 'react'

const CardLoading = () => {
  return (
    <div className='border border-gray-300 p-4 grid gap-3 max-w-32 lg:max-w-52 rounded animate-pulse'>
      <div className='min-h-14 lg:min-h-20 bg-white rounded'></div>
      <div className='p-2 lg:p-3 bg-slate-200 rounded w-20'></div>
      <div className='p-2 lg:p-3 bg-white rounded-md'></div>
      <div className='p-2 lg:p-3 bg-white rounded-md w-14'></div>

      <div className='flex items-center justify-center gap-3'>
        <div className='p-2 lg:p-3 bg-white rounded-md w-20'></div>
        <div className='p-2 lg:p-3 bg-white rounded-md w-20'></div>
      </div>
    </div>
  );
}

export default CardLoading
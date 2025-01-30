import React from 'react';

const CardLoading = () => {
  return (
    <div className='border border-gray-300 p-4 grid gap-3 max-w-xs lg:max-w-sm rounded-lg animate-pulse'>
      {/* Placeholder for Image */}
      <div className='min-h-24 lg:min-h-32 bg-gray-200 rounded-md'></div>

      {/* Placeholder for Title */}
      <div className='p-2 bg-gray-200 rounded-md w-24'></div>

      {/* Placeholder for Description */}
      <div className='p-2 bg-gray-200 rounded-md w-full'></div>

      {/* Placeholder for Price or other info */}
      <div className='p-2 bg-gray-200 rounded-md w-20'></div>

      {/* Placeholder for Action Buttons */}
      <div className='flex items-center justify-between gap-3'>
        <div className='p-2 bg-gray-200 rounded-md w-20'></div>
        <div className='p-2 bg-gray-200 rounded-md w-20'></div>
      </div>
    </div>
  );
};

export default CardLoading;

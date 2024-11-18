import React from 'react'
import { IoClose } from 'react-icons/io5';

const DeleteCategory = ({cancel,confirm,close}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center p-4'>
      <div className='bg-white p-4 w-full max-w-md rounded-md'>
        <div className='flex justify-between items-center gap-3'>
          <p className='text-xl font-semibold'>
            Are you sure you want to delete this category?
          </p>
          <button>
            <IoClose size={26} onClick={close} />
          </button>
        </div>
        <div className='flex justify-end gap-2 mt-4'>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded-md'
            onClick={confirm}>
            Confirm
          </button>
          <button
            className='bg-gray-500 text-white px-4 py-2 rounded-md'
            onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteCategory
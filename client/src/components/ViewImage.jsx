import React from 'react'
import { IoClose } from 'react-icons/io5'

const ViewImage = ({url,close}) => {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='w-full max-w-md p-4 max-h-[80vh]'>
        <button onClick={close} className='absolute top-20 right-20 text-white'>
          <IoClose size={25} />
        </button>
        <img
          src={url}
          alt='Image'
          className='w-full h-full object-scale-down'
        />
      </div>
    </div>
  );
}

export default ViewImage
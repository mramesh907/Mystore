import React from 'react'
import { IoClose } from 'react-icons/io5'

const MoreDetails = ({ close, value, onChange, submit }) => {
  return (
    <section className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 bottom-0 right-0 z-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded p-4 w-full max-w-md'>
        <div className='flex justify-between items-center gap-3'>
          <h1 className='font-semibold'>Add Field</h1>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <input
          type='text'
          name=''
          id=''
          className='my-3 border-gray-300 rounded p-2 outline-none w-full border bg-blue-50 focus-within:border-primary-200'
          placeholder='Enter Field Name'
          value={value}
          onChange={onChange}
        />
        <button
          onClick={submit}
          className='bg-primary-200 text-white px-4 py-2 rounded hover:bg-primary-300'>
          Add Field
        </button>
      </div>
    </section>
  );
};

export default MoreDetails
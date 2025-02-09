import React from 'react';
import { Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const CancelPayment = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-50'>
      <div className='bg-white p-6 shadow-lg rounded-2xl text-center max-w-md'>
        <XCircle className='text-red-500 w-16 h-16 mx-auto' />
        <h2 className='text-2xl font-bold text-red-700 mt-4'>
          Payment Canceled
        </h2>
        <p className='text-gray-600 mt-2'>
          Your payment was not completed. Please try again.
        </p>

        <div className='mt-6'>
          <Link
            to='/'
            className='bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-all'>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;

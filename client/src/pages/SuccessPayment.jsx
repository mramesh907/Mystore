import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const SuccessPayment = () => {
  const location = useLocation();
  const message = location.state || 'Your Payment was Successful!';

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-green-50'>
      <div className='bg-white p-6 shadow-lg rounded-2xl text-center max-w-md'>
        <CheckCircle className='text-green-500 w-16 h-16 mx-auto' />
        <h2 className='text-2xl font-bold text-green-700 mt-4'>
          Payment Successful!
        </h2>
        <p className='text-gray-600 mt-2'>{message}</p>

        <div className='mt-6'>
          <Link
            to='/'
            className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all'>
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;

import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';

const CancelOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if accessed directly without valid order cancellation data
  useEffect(() => {
    if (!location.state?.text) {
      navigate('/'); // Redirect to home
    }
  }, [location.state, navigate]);

  if (!location.state?.text) return null; // Prevents flickering during redirect

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-50 p-4'>
      <div className='bg-white p-6 shadow-lg rounded-2xl text-center max-w-md w-full'>
        <XCircle className='text-red-500 w-16 h-16 mx-auto' />
        <h2 className='text-2xl font-bold text-red-700 mt-4'>Order Canceled</h2>
        <p className='text-gray-600 mt-2'>
          Your order has been canceled successfully.
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

export default CancelOrder;

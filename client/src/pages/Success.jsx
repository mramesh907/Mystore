import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Prevent direct access if `text` is missing
  useEffect(() => {
    if (!location.state?.text) {
      navigate('/'); // Redirect to home
    }
  }, [location.state, navigate]);

  if (!location.state?.text) return null; // Prevents flickering during redirect

  console.log('Order Data:', location.state?.responseData?.data);

  const orderData = location.state?.responseData?.data || [];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-green-50 p-4'>
      <div className='bg-white p-6 shadow-lg rounded-2xl text-center max-w-md w-full'>
        <CheckCircle className='text-green-500 w-16 h-16 mx-auto' />
        <h2 className='text-2xl font-bold text-green-700 mt-4'>
          Order Successful!
        </h2>
        <p className='text-gray-600 mt-2'>
          Your order has been placed successfully.
        </p>

        {/* Order Details */}
        <div className='mt-4 text-left'>
          {orderData.map((order) => (
            <div key={order.orderId} className='border-b pb-3 mb-3'>
              <img
                src={order.productDetails.image[0]}
                alt={order.productDetails.name}
                className='w-24 h-24 object-cover rounded-lg mx-auto'
              />
              <p className='text-lg font-semibold mt-2'>
                {order.productDetails.name}
              </p>
              <p className='text-gray-700 font-semibold'>
                Order ID:{' '}
                <span className='text-green-600'>{order.orderId}</span>
              </p>
            </div>
          ))}
        </div>

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

export default OrderSuccess;

import React from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
const MyOrder = () => {
  const orders = useSelector((state) => state.oders.order);
  // console.log('order', orders);
  const DisplayPriceInRupees = (price) => {
    const formattedPrice = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);

    const rupeeSymbol = formattedPrice.slice(0, 1); // Extract the `₹` symbol
    const remainingText = formattedPrice.slice(1); // Extract the rest of the price
    return (
      <span>
        <span style={{ fontFamily: 'Arial, sans-serif' }}>{rupeeSymbol}</span>
        <span style={{ fontFamily: 'Poppins, sans-serif' }}>
          {remainingText}
        </span>
      </span>
    );
  };
  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>My Orders</h2>

      {orders.length === 0 ? (
        <p className='text-gray-500 text-lg'>No orders found.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {orders.map((order) => (
            <div
              key={order._id}
              className='bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden'>
              {/* Product Image (Only First Image) */}
              {order.productDetails?.image?.length > 0 && (
                <img
                  src={order.productDetails.image[0]} // Displaying only the first image
                  alt={order.productDetails.name}
                  className='w-full h-48 object-contain bg-gray-100 p-4 rounded-t-lg'
                />
              )}

              {/* Order Details */}
              <div className='p-5'>
                <h3 className='text-xl font-semibold text-gray-800'>
                  {order.productDetails.name}
                </h3>
                <p className='text-gray-600 mt-1'>
                  <span className='font-medium'>Order ID:</span> {order.orderId}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Total:</span>{' '}
                  {DisplayPriceInRupees(order.totalAmt)}
                </p>
                <p className='text-gray-600'>
                  <span className='font-medium'>Ordered on:</span>{' '}
                  {format(new Date(order.createdAt), 'dd MMM yyyy')}
                </p>

                {/* Payment Status Badge */}
                <div className='mt-3'>
                  <span
                    className={`inline-block px-4 py-1 text-sm font-medium rounded-full text-white ${
                      order.paymentStatus === 'paid'
                        ? 'bg-green-600'
                        : 'bg-yellow-500'
                    }`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrder;

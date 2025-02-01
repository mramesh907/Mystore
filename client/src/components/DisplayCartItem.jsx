import React from 'react';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../provider/globalProvider';
import { FaCaretRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import AddToCartBtn from './AddToCartBtn';
import emptyCart from '../assets/empty_cart.webp'
const DisplayCartItem = ({ close }) => {
  const { withoutDiscount, totalPrice, totalItems } = useGlobalContext();
  const cartItem = useSelector((state) => state?.cartProduct?.cartProduct);
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
    <section className='bg-neutral-900 fixed top-0 bottom-0 left-0 right-0 bg-opacity-70 z-40'>
      <div className='bg-white w-full max-w-md p-4 min-h-screen max-h-screen ml-auto'>
        <div className='flex justify-between items-center p-2 shadow-md'>
          <h2 className='font-semibold'>Cart</h2>
          <Link to={'/'} className='lg:hidden'>
            <button
              onClick={() => {
                close();
              }}>
              <IoClose size={25} />
            </button>
          </Link>
          <button
            className='hidden lg:block'
            onClick={() => {
              close();
            }}>
            <IoClose size={25} />
          </button>
        </div>
        {cartItem.length === 0 ? (
          <>
            <div className='flex justify-center items-center h-full'>
              <img
                className='w-full h-full object-scale-down'
                src={emptyCart}
                alt=''
              />
            </div>
            <p className='text-center font-semibold'>Your cart is empty</p>
            <p className='text-center'>Add some items to your cart</p>
            <div className='w-full flex items-center justify-center'>
              <Link onClick={() => close()} to={'/'}>
                <button className='w-fit mx-auto mt-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600'>
                  Shop Now
                </button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-120px)] bg-blue-50 overflow-y-auto p-2'>
              {/* Display Items */}

              <div className='p-2 flex justify-between items-center bg-blue-100 text-blue-500 rounded-md'>
                <p className='font-semibold'>Your total savings</p>
                <p className='font-semibold'>
                  {DisplayPriceInRupees(withoutDiscount - totalPrice)}
                </p>
              </div>
              <div className='bg-white rounded-lg p-4 mt-2 shadow-md grid gap-2 overflow-auto'>
                {cartItem.length > 0 &&
                  cartItem.map((item, index) => {
                    return (
                      <div key={index} className='flex w-full gap-2'>
                        <div className='w-20 h-20 min-w-16'>
                          <img
                            src={item?.productId?.image[0]}
                            alt=''
                            className='w-full h-full object-cover border border-gray-300 rounded-md'
                          />
                        </div>
                        <div className='flex flex-col gap-1 w-full'>
                          <p className='text-sm text-ellipsis line-clamp-2'>
                            {item?.productId?.name}
                          </p>
                          <p>{item?.productId?.unit}</p>
                          <p className='font-semibold'>
                            {DisplayPriceInRupees(item?.productId?.price)}
                          </p>
                        </div>
                        <div className=''>
                          <AddToCartBtn data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div>
                <div className='mt-4 bg-blue-400 p-2 rounded mb-4'>
                  <h3 className='text-center text-white font-semibold'>
                    Bill Summary
                  </h3>
                  <div className='flex justify-between items-center'>
                    <p className='text-center text-white font-semibold'>
                       Items Total
                    </p>
                    <p className='flex items-center gap-2'>
                    <span className='line-through text-neutral-300'>{DisplayPriceInRupees(withoutDiscount)}</span>
                    <span className='text-white font-semibold'>{DisplayPriceInRupees(totalPrice)}</span>
                    </p>
                    {/* <p className='text-center text-white font-semibold'>
                      {DisplayPriceInRupees(withoutDiscount)}
                    </p> */}
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-center text-white font-semibold'>
                        Total Items
                    </p>
                    <p className='flex items-center gap-2'>
                    
                    <span className='text-white font-semibold'>{totalItems} item</span>
                    </p>
                  </div>
                  <div className='flex justify-between items-center'>
                    <p className='text-center text-white font-semibold'>
                        Delivery Charge
                    </p>
                    <p className='flex items-center gap-2'>
                    
                    <span className='text-white font-semibold'>Free</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between items-center p-2 py-4 shadow-md bg-green-700 text-neutral-100 sticky bottom-3 rounded mt-4'>
              <div>{DisplayPriceInRupees(totalPrice)}</div>
              <button className='flex items-center gap-2'>
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;

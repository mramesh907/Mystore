import React from 'react';
import { useGlobalContext } from '../provider/globalProvider';
import { FaCartShopping } from 'react-icons/fa6';
import { FaCaretRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const CartMobile = () => {
  const { totalPrice, totalItems } = useGlobalContext();
  const cartItem=useSelector((state) => state?.cartProduct?.cartProduct);
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
    <>
      {cartItem?.length > 0 && (
        <div className='sticky bottom-4 p-2'>
          <div className='bg-green-600 p-2 rounded lg:hidden'>
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-2 bg-green-400 p-2 rounded'>
                <FaCartShopping className='text-white text-2xl' />
              </div>
              <Link to='/cart' className='flex items-center gap-1'>
                <span className='text-white text-sm'>View Cart</span>
                <FaCaretRight className='text-white text-2xl' />
              </Link>
              <div className='flex flex-col'>
                <p className='text-white text-sm'>Total Items: {totalItems}</p>
                <p className='text-white text-sm'>
                  Total Price: {DisplayPriceInRupees(totalPrice)}
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartMobile;

import React from 'react';
import { useGlobalContext } from '../provider/globalProvider';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import AddAddress from '../components/AddAddress';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js";;
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { withoutDiscount, totalPrice, totalItems, fetchCartItems } =
    useGlobalContext();
  const cartItem = useSelector((state) => state?.cartProduct?.cartProduct);
  const [openAddress, setOpenAddress] = useState(false);
  const addresslist = useSelector((state) => state?.addresses?.address);
  const [selectedAddress, setselectedAddress] = useState(0);
  const cartItemList = useSelector((state) => state?.cartProduct?.cartProduct);

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
  const handleCashOnDelivery = async () => {
    if (!addresslist?.length) {
      toast.error('Please add a billing address before proceeding.');
      return;
    }
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDelivery,
        data: {
          list_items: cartItemList,
          deliveryAddress: addresslist[selectedAddress]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
        console.log('response', responseData);

        navigate('/success', {
          state: {
            text: 'success',
            responseData: responseData,
          },
        });
      }
    } catch (error) {
      console.log(error);
      AxiosToastError(error?.message);
      navigate('/cancel', {
        state: {
          text: 'cancel',
        },
      });
    }
  };
  const handleOnlinePayment = async () => {
    if (!addresslist?.length) {
      toast.error('Please add a billing address before proceeding.');
      return;
    }
    try {
      toast.loading('Redirecting to payment page...');
      const VITE_STRIPE_PUBLISHABLE_KEY = import.meta.env
        .VITE_STRIPE_PUBLISHABLE_KEY;
      const stripe = await loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);
      const response = await Axios({
        ...SummaryApi.onlinePayment,
        data: {
          list_items: cartItemList,
          deliveryAddress: addresslist[selectedAddress]?._id,
          totalAmt: totalPrice,
          subTotalAmt: totalPrice,
        },
      })
      const { data: responseData } = response;
      stripe.redirectToCheckout({ sessionId: responseData.id });
    } catch (error) {
      console.log(error);
      toast.dismiss();
      AxiosToastError(error);
    }
  };

  return (
    <section className='bg-gray-100 min-h-screen p-4'>
      <div className='container mx-auto max-w-4xl'>
        <h1 className='text-2xl font-bold text-gray-800 mb-4'>Checkout</h1>

        {/* Billing Address */}
        <div className='mb-6'>
          <h3 className='font-semibold text-lg text-gray-700'>
            Billing Address
          </h3>
          <div>
            {addresslist?.length > 0 ? (
              addresslist.map((item, index) => (
                <label
                  key={index}
                  className={`${!item?.status && 'hidden'}`}
                  htmlFor={'item' + index}>
                  <div
                    key={index}
                    className='mt-2 bg-white rounded-lg border border-gray-300 p-4 shadow-sm cursor-pointer hover:bg-gray-200 transition flex flex-col gap-1'>
                    <div>
                      {/* <input
                        className='mr-2 cursor-pointer'
                        defaultChecked={selectedAddress === index}
                        id={'item' + index}
                        type='radio'
                        name='item'
                        value={index}
                        onChange={(e) => setselectedAddress(e.target.value)}
                      /> */}
                      <input
                        className='w-5 h-5 mt-1 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer'
                        defaultChecked={selectedAddress === index}
                        id={'item' + index}
                        type='radio'
                        name='address'
                        value={index}
                        onChange={(e) => setselectedAddress(e.target.value)}
                      />
                    </div>

                    <p className='text-gray-800 font-medium'>
                      {item?.addressLine}
                    </p>
                    <p className='text-gray-600 text-sm'>
                      {item?.city}, {item?.state} - {item?.pincode}
                    </p>
                    <p className='text-gray-600 text-sm'>{item?.country}</p>
                    <p className='text-gray-700 font-medium'>
                      📞 {item?.mobile}
                    </p>
                  </div>
                </label>
              ))
            ) : (
              <p className='text-gray-500 mt-2'>No address found.</p>
            )}
          </div>

          <div
            onClick={() => setOpenAddress(true)}
            className='h-16 mt-2 bg-white rounded-lg border border-gray-500 p-3 border-dotted flex justify-center items-center text-gray-500 cursor-pointer hover:bg-gray-200'>
            Add Billing Address
          </div>
        </div>

        {/* Bill Summary */}
        <div className='bg-white p-5 rounded-lg shadow-md'>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Bill Summary
          </h3>

          <div className='space-y-4'>
            {cartItem.length > 0 &&
              cartItem.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center gap-4 border-b pb-3'>
                  <img
                    src={item?.productId?.image[0]}
                    alt={item?.productId?.name}
                    className='w-16 h-16 object-cover rounded-md border border-gray-300'
                  />
                  <div className='flex flex-col w-full'>
                    <p className='text-gray-700 font-medium'>
                      {item?.productId?.name}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {item?.productId?.unit}
                    </p>
                    <p className='text-primary font-semibold'>
                      {DisplayPriceInRupees(item?.productId?.price)}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {/* Pricing Breakdown */}
          <div className='mt-6 space-y-2 text-gray-700'>
            <div className='flex justify-between'>
              <span>Total Items</span>
              <span className='font-semibold'>{totalItems} item(s)</span>
            </div>

            <div className='flex justify-between'>
              <span>Items Total</span>
              <span className='flex items-center gap-2'>
                <span className='line-through text-gray-400'>
                  {DisplayPriceInRupees(withoutDiscount)}
                </span>
                <span className='font-semibold'>
                  {DisplayPriceInRupees(totalPrice)}
                </span>
              </span>
            </div>

            <div className='flex justify-between'>
              <span>Delivery Charge</span>
              <span className='text-green-600 font-semibold'>Free</span>
            </div>

            <div className='border-t border-gray-300 pt-2 flex justify-between text-lg font-bold'>
              <span>Grand Total</span>
              <span className='text-primary'>
                {DisplayPriceInRupees(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <div className='mt-6 flex flex-col gap-3 items-center'>
          <button
          onClick={handleOnlinePayment}
          className='w-full max-w-md py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition'>
            Online Payment
          </button>
          <button
            onClick={handleCashOnDelivery}
            className='w-full max-w-md py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition'>
            Cash on Delivery
          </button>
        </div>
      </div>
      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;

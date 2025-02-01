import React, { useEffect, useState } from 'react';
import SummaryApi from '../common/SummartApi.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import Axios from '../utils/Axios.js';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/globalProvider.jsx';
import LiteLoading from './LiteLoading.jsx';
import { useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa6';
const AddToCartBtn = ({ data }) => {
  const { fetchCartItems, handleUpdateItemQty, handleDeleteItem } =
    useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state?.cartProduct?.cartProduct);
  // console.log('cartItem', cartItem);

  const [isAvailable, setIsAvailable] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItemDetails, setCartItemDetails] = useState();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItems) {
          fetchCartItems();
        }
      }
    } catch (error) {
      console.log('error', error);
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAvailability = cartItem?.some(
      (item) => item.productId?._id === data?._id
    );
    setIsAvailable(checkAvailability);

    const productQuantity = cartItem?.find(
      (item) => item.productId?._id === data?._id
    );
    setQuantity(productQuantity?.quantity);
    setCartItemDetails(productQuantity);
  }, [data, cartItem]);
  const incrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log('cartItemDetails?._id', cartItemDetails?._id);

    handleUpdateItemQty(cartItemDetails?._id, quantity + 1);
    toast.success('Item added to cart');
  };
  const decrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      handleDeleteItem(cartItemDetails?._id);
      return;
    } else {
      handleUpdateItemQty(cartItemDetails?._id, quantity - 1);
      toast.success('Item removed from cart');
    }
  };
  return (
    <div className='w-full max-w-[100px]'>
      {isAvailable ? (
        <div className='flex w-full h-full'>
          <button
            onClick={decrementQuantity}
            className='bg-red-600 hover:bg-red-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
            <FaMinus />
          </button>

          <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>
            {quantity}
          </p>

          <button
            onClick={incrementQuantity}
            className='bg-green-600 hover:bg-green-700 text-white flex-1 w-full p-1 rounded flex items-center justify-center'>
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className='bg-green-600 text-white px-2 lg:px-4 py-2 rounded hover:bg-green-700 transition-all w-full'>
          {loading ? <LiteLoading /> : 'Add'}
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;

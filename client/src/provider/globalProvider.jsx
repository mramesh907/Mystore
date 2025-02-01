import { createContext, useContext, useEffect, useState } from 'react';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/cartProduct';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { priceDiscount } from '../utils/PriceDiscount';
export const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [withoutDiscount, setWithoutDiscount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const cartItem = useSelector((state) => state?.cartProduct?.cartProduct);
  const fetchCartItems = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getCart,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(addProduct(responseData.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateItemQty = async (id, qty) => {
    try {
      const response = await Axios({
        ...SummaryApi.updateCartQty,
        data: {
          productId: id,
          quantity: qty,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        // toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleDeleteItem = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCartItem,
        data: {
          productId: id,
        },
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  useEffect(() => {
    const totalItems = cartItem.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const totalPrice = cartItem.reduce(
      (total, item) =>
        total +
        priceDiscount(item.productId.price, item.productId.discount) *
          item.quantity,
      0
    );

    const withoutDiscount = cartItem.reduce(
      (total, item) => total + item?.productId?.price * item.quantity,
      0
    )

    setTotalItems(totalItems);
    setTotalPrice(totalPrice);
    setWithoutDiscount(withoutDiscount)
  }, [cartItem]);
  return (
    <GlobalContext.Provider
      value={{
        fetchCartItems,
        handleUpdateItemQty,
        handleDeleteItem,
        totalPrice,
        totalItems,
        withoutDiscount,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

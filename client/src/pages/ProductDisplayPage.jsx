import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummartApi.js';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import minute_delivery from '../assets/minute_delivery.png';
import Best_Prices_Offers from '../assets/Best_Prices_Offers.png';
import Wide_Assortment from '../assets/Wide_Assortment.png';
import { priceDiscount } from '../utils/PriceDiscount.js';
import AddToCartBtn from '../components/AddToCartBtn.jsx';
const ProductDisplayPage = () => {
  const params = useParams();
  const [data, setData] = useState({
    name: '',
    image: [],
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(0);
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

  let productId = params?.product?.split('-')?.splice(-1)[0];

  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId: productId },
      });
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [params]);

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 gap-4'>
      {/* Image Section */}
      <div className='flex flex-col justify-center items-center'>
        <div className='w-full max-w-md h-[72vh] relative bg-white hover:shadow-lg'>
          <img
            src={data?.image[image]}
            alt='Product'
            className='w-full h-full object-contain rounded-md shadow-lg'
          />
        </div>

        {/* Thumbnail Images with Navigation Buttons */}
        <div className='mt-4 w-full flex items-center justify-center relative'>
          {data?.image?.length > 1 && (
            <div className='relative w-full flex items-center'>
              {/* Left Button */}
              <button
                className='absolute left-0 bg-white p-2 rounded-full shadow-md'
                onClick={() =>
                  setImage(image > 0 ? image - 1 : data?.image.length - 1)
                }>
                <FaAngleLeft size={20} />
              </button>

              {/* Thumbnails */}
              <div className='flex gap-2 mx-auto overflow-x-auto scrollbar-none w-[80%]'>
                {data?.image?.map((item, index) => (
                  <img
                    src={item}
                    alt={`Product Image ${index + 1}`}
                    key={index}
                    className={`cursor-pointer w-16 h-16 object-contain rounded-md shadow-md border-2 ${
                      index === image ? 'border-blue-500' : 'border-transparent'
                    }`}
                    onClick={() => setImage(index)}
                  />
                ))}
              </div>

              {/* Right Button */}
              <button
                className='absolute right-0 bg-white p-2 rounded-full shadow-md'
                onClick={() =>
                  setImage(image < data?.image.length - 1 ? image + 1 : 0)
                }>
                <FaAngleRight size={20} />
              </button>
            </div>
          )}
        </div>
        <div className='my-4 grid gap-3'>
          <div>
            <p className='font-semibold'>Product Details</p>
            <p className='font-medium'>Description</p>
            <p className='text-sm'>{data?.description}</p>
          </div>
          <div>
            <p className='font-medium'>Unit</p>
            <p className='text-sm'>{data?.unit}</p>
          </div>
          {data?.moreDetails && Object.keys(data?.moreDetails).length > 0 && (
            <div>
              <p className='font-semibold'>Key Features</p>
              {Object.entries(data.moreDetails).map(([key, value], index) => (
                <div key={index}>
                  <p className='font-normal'>
                    {key}: {value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Details Section */}
      <div className='space-y-4'>
        <h1 className='text-2xl font-bold'>{data?.name}</h1>
        {/* Add other product details here */}
        <p>{data?.description}</p>
        <p className='text-lg bg-green-300 px-2 py-1 w-fit rounded-md'>
          {data?.unit}
        </p>
        <div>
          <p className='text-lg'>Price</p>
          <div className='flex items-center space-x-2'>
            {/* Discounted price */}
            <p className='text-xl font-semibold text-gray-700 border border-green-300 px-2 py-1 w-fit rounded-md'>
              {DisplayPriceInRupees(priceDiscount(data?.price, data?.discount))}
            </p>
            {/* MRP with strikethrough */}
            <p className='text-sm text-gray-500'>MRP</p>
            <p className='text-xl font-semibold text-gray-500 line-through'>
              {DisplayPriceInRupees(data?.price)}
            </p>

            {/* Discount Percentage */}
            {data?.discount > 0 && (
              <p className='text-semibold text-white bg-primary-100 px-2 py-1 w-fit rounded-md'>
                {data?.discount}% OFF
              </p>
            )}
          </div>
          <p className='text-sm text-gray-500'>Inclusive of all taxes</p>
        </div>

        {data?.stock > 0 ? (
          <>
            {/* <p className='text-lg'>In Stock</p> */}
            {/* <button className='bg-green-600 text-white px-2 lg:px-4 py-2 rounded hover:bg-green-700'>
              Add
            </button> */}
            <AddToCartBtn data={data} />
          </>
        ) : (
          <p className='text-lg text-red-600'>Out of Stock</p>
        )}

        <h2 className='font-semibold mt-4'>Why shop from us?</h2>
        <div>
          <div className='flex items-center gap-2 my-4'>
            <img
              src={minute_delivery}
              className='w-20 h-20'
              alt='minute_delivery'
            />
            <div className='space-y-1'>
              <div className='font-semibold'>Fast Delivery</div>
              <p className='text-gray-600'>Delivered in 2-3 business days</p>
            </div>
          </div>
          <div className='flex items-center gap-2 my-4'>
            <img
              src={Best_Prices_Offers}
              className='w-20 h-20'
              alt='Best_Prices_Offers'
            />
            <div className='space-y-1'>
              <div className='font-semibold'>Best Prices & Offers</div>
              <p className='text-gray-600'>Best prices and exclusive offers</p>
            </div>
          </div>
          <div className='flex items-center gap-2 my-4'>
            <img
              src={Wide_Assortment}
              className='w-20 h-20'
              alt='Wide_Assortment'
            />
            <div className='space-y-1'>
              <div className='font-semibold'>Wide Assortment</div>
              <p className='text-gray-600'>Wide selection of products</p>
            </div>
          </div>
          <p className='text-gray-600'>
            We are committed to providing you with the best quality products,
            ensuring that you receive a satisfying experience and value for your
            money.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDisplayPage;

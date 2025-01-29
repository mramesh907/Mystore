import React from 'react'
import { Link } from 'react-router-dom';
import { validUrlConver } from '../utils/validUrlConver';
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
      <span style={{ fontFamily: 'Poppins, sans-serif' }}>{remainingText}</span>
    </span>
  );
};

const CardProduct = ({data}) => {  
  const url = `/product/${validUrlConver(data?.name)}-${data?._id}`;
  return (
    <Link
      to={url}
      className='border py-2 lg:p-4 grid lg:gap-3 gap-1 lg:min-w-52  min-w-36 rounded cursor-pointer border-gray-300 bg-white'>
      <div className='min-h-20 w-full max-h-24 lg:max-h-24 rounded bg-blue-50 overflow-hidden'>
        <img
          src={data?.image[0]}
          alt={data?.name}
          className='w-full h-full object-scale-down bg-white '
        />
      </div>
      <div className='p-2 ml-1 text-xs w-fit px-2 text-green-600 rounded bg-green-100'>
        10 min
      </div>
      <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2 text-center'>
        {data?.name}
      </div>
      <div className='lg:px-0 w-fit px-2 text-sm lg:text-base'>
        {data?.unit}
      </div>

      <div className='px-2 flex items-center justify-center gap-3 text-sm lg:text-base'>
        <div className='font-semibold text-sm'>
          {DisplayPriceInRupees(data?.price)}
        </div>
        <div className='font-semibold '>{data?.quantity}</div>
        <div>
          <button className='bg-green-600 text-white px-2 lg:px-4 py-2 rounded hover:bg-green-700'>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default CardProduct
import React from 'react';
import { IoClose } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import SummaryApi from '../common/SummartApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import { useGlobalContext } from '../provider/globalProvider';

const addressSchema = yup.object().shape({
  addressLine: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required'),
  country: yup.string().required('Country is required'),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile number is required'),
});

const EditAddress = ({ close ,data}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      addressLine: data.addressLine,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      country: data.country,
      mobile: data.mobile,
    },  
  });
  const {fetchaddress} = useGlobalContext();

  const onSubmit = async(data) => {
   try {
    const response = await Axios({
      ...SummaryApi.addAddress,
      data: {
        addressLine: data.addressLine,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        country: data.country,
        mobile: data.mobile,
      },
    });
    const { data: responseData } = response;
    if (responseData.success) {
      toast.success(responseData.message);
      close();
      fetchaddress();
    }
   } catch (error) {
    console.log(error);
    
    return AxiosToastError(error);
   }
    reset(); // Clear form after submission
  };

  return (
    <section className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50'>
      <div className='bg-white p-6 w-full max-w-md rounded-lg shadow-lg'>
        {/* Header */}
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-lg font-semibold'>Edit Address</h1>
          <button onClick={close}>
            <IoClose size={25} className='text-gray-700 hover:text-gray-900' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
          <div>
            <label className='block text-sm font-medium'>Address</label>
            <input
              type='text'
              {...register('addressLine')}
              className='w-full border rounded-md p-2'
              placeholder='Address'
            />
            <p className='text-red-500 text-sm'>
              {errors.addressLine?.message}
            </p>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>City</label>
              <input
                type='text'
                {...register('city')}
                className='w-full border rounded-md p-2'
                placeholder='City'
              />
              <p className='text-red-500 text-sm'>{errors.city?.message}</p>
            </div>

            <div>
              <label className='block text-sm font-medium'>State</label>
              <input
                type='text'
                {...register('state')}
                className='w-full border rounded-md p-2'
                placeholder='State'
              />
              <p className='text-red-500 text-sm'>{errors.state?.message}</p>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-sm font-medium'>Pincode</label>
              <input
                type='text'
                {...register('pincode')}
                className='w-full border rounded-md p-2'
                placeholder='Pincode'
              />
              <p className='text-red-500 text-sm'>{errors.pincode?.message}</p>
            </div>

            <div>
              <label className='block text-sm font-medium'>Country</label>
              <input
                type='text'
                {...register('country')}
                className='w-full border rounded-md p-2'
                placeholder='Country'
              />
              <p className='text-red-500 text-sm'>{errors.country?.message}</p>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium'>Mobile</label>
            <input
              type='text'
              {...register('mobile')}
              className='w-full border rounded-md p-2'
              placeholder='Mobile'
            />
            <p className='text-red-500 text-sm'>{errors.mobile?.message}</p>
          </div>

          {/* Submit Button */}
          <div className='mt-4 flex justify-end gap-3'>
            <button
              type='button'
              onClick={close}
              className='px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200'>
              Cancel
            </button>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
              Update Address
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditAddress;

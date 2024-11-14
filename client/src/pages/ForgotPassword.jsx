/* eslint-disable no-empty */
import React, { useState } from 'react';
import { IoMdEyeOff } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
SummaryApi;
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
const ForgotPassword = () => {
  const [data, setdata] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const validateForm = Object.values(data).every((item) => item);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/verification-otp', {
          state: data,
        });
        setdata({
          email: '',
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Forgot Password</p>

        <form className='grid gap-4 py-4 mt-6' onSubmit={handleSubmit}>
          {/* email */}
          <div className='grid gap-1 '>
            <label htmlFor='email'>Email :</label>
            <input
              type='email'
              id='email'
              className='bg-blue-50 p-2 border  rounded outline-none focus:border-primary-200'
              name='email'
              value={data.email}
              onChange={handleChange}
              placeholder='Enter your email'
            />
          </div>

          <button
            disabled={!validateForm}
            className={`${validateForm ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'}  text-white rounded py-2 font-semibold my-3 tracking-wide`}>
            Send Otp
          </button>
        </form>

        <p>
          Alredy have an account ? &nbsp;
          <Link
            to={'/login'}
            className='font-semibold text-green-700 hover:text-green-800'>
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;

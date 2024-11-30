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
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {
  const [data, setdata] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch()
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
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        const userDetails = await fetchUserDetails()

        dispatch(setUserDetails(userDetails.data));

        setdata({
          email: '',
          password: '',
        });
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Login</p>

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
          {/* password */}
          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none bg-blue-50 border-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
              />
              <div
                onClick={() => setshowPassword((preve) => !preve)}
                className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          <Link
            to='/forgot-password'
            className='text-right font-semibold text-green-700 hover:text-green-800'>
            Fogot your password?
          </Link>

          <button
            disabled={!validateForm}
            className={`${validateForm ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'}  text-white rounded py-2 font-semibold my-3 tracking-wide`}>
            Login
          </button>
        </form>

        <p>
          Don't have an account? <span> </span>
          <Link
            to={'/register'}
            className='font-semibold text-green-700 hover:text-green-800'>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

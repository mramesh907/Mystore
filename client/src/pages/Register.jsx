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
const Register = () => {
  const [data, setdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
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
    if (data.password !== data.confirmPassword) {
      toast.error('Password and Confirm Password must be same');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setdata({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/login');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Register</p>

        <form
          className='grid gap-4 mt-6'
          onSubmit={handleSubmit}
          autoComplete='off'>
          {/* name */}
          <div className='grid gap-1 '>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              autoFocus
              className='bg-blue-50 p-2 border rounded outline-none focus:border-primary-200'
              name='name'
              value={data.name}
              onChange={handleChange}
              placeholder='Enter your name'
              autoComplete='off'
            />
          </div>
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
              autoComplete='off'
            />
          </div>
          {/* password */}
          <div className='grid gap-1'>
            <label htmlFor='password'>Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none'
                name='password'
                value={data.password}
                onChange={handleChange}
                placeholder='Enter your password'
                autoComplete='new-password'
              />
              <div
                onClick={() => setshowPassword((preve) => !preve)}
                className='cursor-pointer'>
                {showPassword ? <FaRegEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>
          {/* confirm password */}
          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'>Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter your confirm password'
                autoComplete='new-password'
              />
              <div
                onClick={() => setshowConfirmPassword((preve) => !preve)}
                className='cursor-pointer'>
                {showConfirmPassword ? <FaRegEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          <button
            disabled={!validateForm}
            className={`${validateForm ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'}  text-white rounded py-2 font-semibold my-3 tracking-wide`}>
            Register
          </button>
        </form>

        <p>
          Already have an account ? &nbsp;
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

export default Register;

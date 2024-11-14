import React, { useEffect, useState } from 'react';
import { FaRegEye } from 'react-icons/fa6';
import { IoMdEyeOff } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummartApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
const ResetPassword = () => {
  const location = useLocation();
  console.log('location : ', location);
  const navigate = useNavigate();
  const [data, setdata] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const validateForm = Object.values(data).every((item) => item);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate('/');
    }
    if (location?.state?.email) {
      setdata((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setdata((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password must be same.');
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
        setdata({
          email: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=' w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Reset Password</p>

        <form className='grid gap-4 py-4 mt-6' onSubmit={handleSubmit}>
          {/* new password */}

          <div className='grid gap-1'>
            <label htmlFor='password'>New Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                className='w-full outline-none'
                name='newPassword'
                value={data.newPassword}
                onChange={handleChange}
                placeholder='Enter your new password'
              />
              <div
                onClick={() => setshowPassword((preve) => !preve)}
                className='cursor-pointer'
              >
                {showPassword ? <FaRegEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          {/* confirm new password */}
          <div className='grid gap-1'>
            <label htmlFor='confirmPassword'> Confirm Password :</label>
            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                className='w-full outline-none'
                name='confirmPassword'
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder='Enter your confirm password'
              />
              <div
                onClick={() => setshowConfirmPassword((preve) => !preve)}
                className='cursor-pointer'
              >
                {showConfirmPassword ? <FaRegEye /> : <IoMdEyeOff />}
              </div>
            </div>
          </div>

          <button
            disabled={!validateForm}
            className={`${validateForm ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'}  text-white rounded py-2 font-semibold my-3 tracking-wide`}
          >
            Change Password
          </button>
        </form>

        <p>
          Alredy have an account ? &nbsp;
          <Link
            to={'/login'}
            className='font-semibold text-green-700 hover:text-green-800'
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ResetPassword;

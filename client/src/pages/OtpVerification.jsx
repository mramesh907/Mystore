/* eslint-disable no-empty */
import React, { useRef, useState, useEffect } from 'react';
import { IoMdEyeOff } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {
  const [data, setdata] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(120); // 2-minute timer
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate('/forgot-password');
    }
  }, []);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false); // Enable resend button after timer expires
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

 const handleResendOtp = async () => {
   const email = location?.state?.email;
   if (!email) {
     toast.error('Please enter your email.');
     return;
   }

   try {
     const response = await Axios({
       ...SummaryApi.forgot_password,
       data: { email },
     });

     if (response.data.success) {
       toast.success('OTP resent successfully.');

       // Reset the timer to 120 seconds
       setTimer(120);
       setIsResendDisabled(true); // Disable resend button until the timer runs out
     } else {
       toast.error(response.data.message || 'Failed to resend OTP.');
     }
   } catch (error) {
     AxiosToastError(error);
   }
 };





  const validateForm = data.every((item) => item);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(''),
          email: location?.state?.email,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);

        setdata(['', '', '', '', '', '']);
        navigate('/reset-password', {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Enter OTP</p>

        <form className='grid gap-4 py-4 mt-6' onSubmit={handleSubmit}>
          {/* OTP Input */}
          <div className='grid gap-1'>
            <label htmlFor='otp'>Enter Your OTP :</label>
            <div className='flex items-center gap-2 justify-between mt-3'>
              {data.map((item, index) => (
                <input
                  key={'otp' + index}
                  type='text'
                  id='otp'
                  ref={(ref) => {
                    inputRef.current[index] = ref;
                    return ref;
                  }}
                  value={data[index]}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newData = [...data];
                    newData[index] = value;
                    setdata(newData);

                    if (value && index < 5) {
                      inputRef.current[index + 1].focus();
                    }
                  }}
                  maxLength={1}
                  className='bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold'
                />
              ))}
            </div>
          </div>

          <button
            disabled={!validateForm}
            className={`${
              validateForm ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'
            } text-white rounded py-2 font-semibold my-3 tracking-wide`}>
            Verify OTP
          </button>
        </form>

        {/* Timer Display */}
        <div className='text-center my-2'>
          {isResendDisabled ? (
            <p className='text-gray-500'>
              Resend OTP in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, '0')}
            </p>
          ) : (
            <button
              onClick={handleResendOtp}
              className='text-blue-500 hover:text-blue-700 font-semibold'>
              Resend OTP
            </button>
          )}
        </div>

        <p>
          Already have an account? &nbsp;
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

export default OtpVerification;

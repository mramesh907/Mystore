import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/SummartApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(3); // Set initial timer to 3 seconds

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(location.search); // Get the query params
      const code = urlParams.get('code'); // Extract code from query string

      if (code) {
        try {
          const response = await Axios({
            ...SummaryApi.verifyEmail,
            params: { code },
          });

          if (response.data.success) {
            setIsVerified(true);
            toast.success(
              response.data.message || 'Email verified successfully!'
            );

            // Start the countdown to redirect
            let countdown = 3;
            const timerInterval = setInterval(() => {
              countdown -= 1;
              setTimer(countdown);
              if (countdown <= 0) {
                clearInterval(timerInterval);
                navigate('/login'); // Redirect to login page after 3 seconds
              }
            }, 1000); // Update every second
          } else {
            toast.error(response.data.message || 'Email verification failed.');
          }
        } catch (error) {
          AxiosToastError(error);
        }
      } else {
        toast.error('No verification code found.');
      }
    };

    verifyEmail();
  }, [location.search, navigate]);

  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
        <p className='text-2xl font-semibold text-center'>Verify Email</p>
        <p className='text-center mt-4'>
          {isVerified
            ? `Your email has been successfully verified! Redirecting to login in ${timer} seconds...`
            : 'Please wait while we verify your email...'}
        </p>
      </div>
    </section>
  );
};

export default VerifyEmail;

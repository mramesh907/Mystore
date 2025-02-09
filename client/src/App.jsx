import { Outlet, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummartApi';
import { GlobalProvider } from './provider/globalProvider.jsx';
import CartMobile from './components/CartMobile.jsx';
function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  // const fetchUser = async () => {
  //   const userData = await fetchUserDetails();
  //   dispatch(setUserDetails(userData?.data));
  // };
  const fetchUser = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData?.data));
      } catch (error) {
        console.error('Error fetching user details:', error);
        toast.error('Failed to fetch user details.');
      }
    }
  };

  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fetchSubCategory();
  }, []);
  return (
    <GlobalProvider>
      <Header />
      <main className='min-h-[80vh]'>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      {location.pathname !== '/checkout' && <CartMobile />}
    </GlobalProvider>
  );
}

export default App;

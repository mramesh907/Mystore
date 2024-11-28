import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlineExternalLink } from 'react-icons/hi';
import Admin from '../utils/Admin.js';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate('/');
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const handleClose = () => {
    if (close) {
      close();
    }
  };
  return (
    <div>
      <Link
        to={'/dashboard/profile'}
        onClick={handleClose}
        className='font-semibold hover:text-green-500'>
        My Account
      </Link>
      <div className='text-lg flex items-center gap-2'>
        <span className='max-w52 text-ellipsis line-clamp-1 text-base hover:text-blue-500'>
          {user.name || user.mobile}
          <span className='text-xs text-red-500'>
            {user.role === 'ADMIN' ? '(Admin)' : ''}
          </span>
        </span>
        <Link
          onClick={handleClose}
          to={'/dashboard/profile'}
          className='hover:text-red-500'>
          <HiOutlineExternalLink size={20} />
        </Link>
      </div>
      <Divider />
      {/* <Divider /> */}
      <div className='text-sm grid '>
        {Admin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/category'}
            className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
            Category
          </Link>
        )}
        {Admin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/subcategory'}
            className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
            Sub Category
          </Link>
        )}
        {Admin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/upload-product'}
            className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
            Upload Product
          </Link>
        )}
        {Admin(user.role) && (
          <Link
            onClick={handleClose}
            to={'/dashboard/product'}
            className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
            Product
          </Link>
        )}
        <Link
          onClick={handleClose}
          to={'/dashboard/myorders'}
          className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
          My Orders
        </Link>
        <Link
          onClick={handleClose}
          to={'/dashboard/address'}
          className='px-2 py-1 hover:bg-secondary-200 hover:text-white'>
          Save Address
        </Link>
        <button
          onClick={handleLogout}
          className='text-left bg-blue-500 text-white px-2 py-1 my-1 hover:bg-blue-600'>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;

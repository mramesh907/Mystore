import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaRegUserCircle } from 'react-icons/fa';
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';
SummaryApi
const Profile = () => {
    const user = useSelector(state => state.user)
    const [openProfileAvatarEdit, setopenProfileAvatarEdit] = useState(false)
    const [userData, setuserData] = useState({
      name:user.name,
      email:user.email,
      mobile:user.mobile
    })
    const [loading, setloading] = useState(false)
    const dispatch = useDispatch()
    useEffect(()=>{
        setuserData({
          name: user.name,
          email: user.email,
          mobile: user.mobile,
        });
    },[user])
    const handleOnChange =(e)=>{
        const {name,value} = e.target
        setuserData((preve)=>{
          return{
            ...preve,
            [name]:value
          }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setloading(true)
            const response = await Axios({
              ...SummaryApi.updateUserDetails,
              data: userData
            })
            const {data : responseData}=response
            if(responseData.success){
              toast.success(responseData.message)
                 const userData = await fetchUserDetails();
                 dispatch(setUserDetails(userData.data));
            }
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setloading(false)
        }
    }
  return (
    <div>
        <div className='flex flex-col justify-center items-center'>
      {/* profile upload and display image */}
      <div className='flex justify-center items-center w-20 h-20 bg-red-400 rounded-full overflow-hidden drop-shadow-sm'>
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className='w-full h-full' />
        ) : (
          <FaRegUserCircle size={50} />
        )}
      </div>
      <button
        onClick={() => {
          setopenProfileAvatarEdit(true);
        }}
        className='btn text-sm min-w-20 border border-primary-100 hover:border-primary-200 hover:bg-primary-100 px-3 py-1 rounded-full mt-3'>
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit
          close={() => {
            setopenProfileAvatarEdit(false);
          }}
        />
      )}
    </div>
      {/* name , mobile , email , change password */}
      <form className='border border-gray-200 rounded p-4 mt-4 my-4 ml-2 grid gap-4' onSubmit={handleSubmit} >
        <div className='grid'>
          <label>Name</label>
          <input
            type='text'
            name='name'
            value={userData.name}
            placeholder='Enter your name'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='grid'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            value={userData.email}
            required
            placeholder='Enter your email'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            onChange={handleOnChange}
          />
        </div>
        <div className='grid'>
          <label htmlFor='mobile'>Mobile</label>
          <input
            type='text'
            name='mobile'
            id='mobile'
            value={userData.mobile}
            required
            placeholder='Enter your mobile'
            className='p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded'
            onChange={handleOnChange}
          />
        </div>

        <button className='border px-4 py-2 font-semibold bg-primary-100 hover:bg-primary-200 border-black rounded'>
          {
            loading ? "Loading..." : "Submit"
          }
        </button>
      </form>
    </div>
  );
}

export default Profile
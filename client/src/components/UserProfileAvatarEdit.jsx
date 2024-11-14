import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummartApi';
import AxiosToastError from '../utils/AxiosToastError';
import { updateAvatar } from '../store/userSlice';
import { IoClose } from 'react-icons/io5';

const UserProfileAvatarEdit = ({close}) => {
    const user =useSelector(state => state.user)
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)

    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    const handleUploadAvatarImage = async(e)=>{
        const file=e.target.files[0]
        if(!file){
            return
        }
        const formData = new FormData()
        formData.append('avatar',file)
        try {
            setloading(true);
            const res = await Axios({
              ...SummaryApi.uploadAvatar,
              data: formData,
            });
            const { data:responseData } = res
            dispatch(updateAvatar(responseData.data.avatar))
        } catch (error) {
            AxiosToastError(error)
        }finally{
            setloading(false)
        }
        
    }

  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900 bg-opacity-60 p-4 flex justify-center items-center'>
      <div className='bg-white max-w-sm w-full rounded p-4 flex flex-col items-center justify-center'>
        <button onClick={close} className='text-neutral-800 w-fit block ml-auto'>
            <IoClose size={20}/>
        </button>
        <div className='flex justify-center items-center w-20 h-20 bg-red-400 rounded-full overflow-hidden drop-shadow-sm'>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className='w-full h-full' />
          ) : (
            <FaRegUserCircle size={50} />
          )}
        </div>
        <form onSubmit={handleSubmit} action=''>
          <label
            htmlFor='uploadProfile'>
            <div className='btn text-sm border border-primary-100 hover:border-primary-200 hover:bg-primary-100 px-4 py-1 rounded my-3 cursor-pointer'>
              
              {
                loading ? "Loading...":"Upload"
              }
            </div>
          </label>
          <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden' />
        </form>
      </div>
    </section>
  );
}

export default UserProfileAvatarEdit
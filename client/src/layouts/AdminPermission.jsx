import React from 'react'
import { useSelector } from 'react-redux'
import Admin from '../utils/Admin'

const AdminPermission = ({children}) => {
    const user = useSelector(state => state.user)
  return (
    <>
      {
        Admin(user.role) ? children :
        <p className='text-center text-2xl text-red-500 bg-red-300 font-semibold p-4'>You don't have permission to access this page </p>
      }
    </>
  )
}

export default AdminPermission
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddAddress from '../components/AddAddress';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';
import EditAddress from '../components/EditAddress';
const Address = () => {
  const addresslist = useSelector((state) => state?.addresses?.address);
  const [openAddress, setOpenAddress] = useState(false);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [editAddress, setEditAddress] = useState({});
  return (
    <div>
      <div className='bg-white shadow-md px-2 py-2'>
        <h3 className='font-semibold text-lg text-gray-700'>Saved Address</h3>
      </div>
      <div className='mb-6 ml-4'>
        <div>
          {addresslist?.length > 0 ? (
            addresslist.map((item, index) => (
              <div
                key={index}
                className='mt-2 bg-white rounded-lg border border-gray-300 p-4 shadow-sm cursor-pointer hover:bg-gray-200 transition flex flex-col gap-1'>
                <div className='flex justify-end gap-4'>
                  <button className='bg-green-300 p-1 rounded hover:text-white hover:bg-green-600'>
                    <MdEdit
                      onClick={() => {
                        setOpenEditAddress(true);
                        setEditAddress(item);
                      }}
                      size={20}
                      className='text-gray-500 hover:text-white cursor-pointer'
                    />
                  </button>
                  <button className='bg-red-300 p-1 rounded hover:text-white hover:bg-red-600'>
                    <MdDelete
                      size={20}
                      className='text-gray-500 hover:text-white cursor-pointer'
                    />
                  </button>
                </div>
                <p className='text-gray-800 font-medium'>{item?.addressLine}</p>
                <p className='text-gray-600 text-sm'>
                  {item?.city}, {item?.state} - {item?.pincode}
                </p>
                <p className='text-gray-600 text-sm'>{item?.country}</p>
                <p className='text-gray-700 font-medium'>📞 {item?.mobile}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500 mt-2'>No address found.</p>
          )}
        </div>

        <div
          onClick={() => setOpenAddress(true)}
          className='h-16 mt-2 bg-white rounded-lg border border-gray-500 p-3 border-dotted flex justify-center items-center text-gray-500 cursor-pointer hover:bg-gray-200'>
          Add Billing Address
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
      {openEditAddress && <EditAddress close={() => setOpenEditAddress(false)} data={editAddress} />}
    </div>
  );
};

export default Address;

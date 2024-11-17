import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'
const NoData = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-2'>
        <img src={noDataImage} alt="No Data" className='w-36' />
        <p className='text-center text-neutral-500'>No Data</p>
    </div>
  )
}

export default NoData
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummartApi.js'
import Axios from '../utils/Axios.js'
import AxiosToastError from '../utils/AxiosToastError.js'
import {FaAngleLeft,FaAngleRight} from 'react-icons/fa6'
const ProductDisplayPage = () => {
  const params=useParams();
  const [data,setData]=useState({
    name:'',
    image:[]
  })
  const [loading,setLoading]=useState(false);
  const [image,setImage]=useState(0);


  let productId=params?.product?.split('-')?.splice(-1)[0];
  
  const fetchProductData=async()=>{
    try {
      const response=await Axios({
        ...SummaryApi.getProductDetails,
        data:{productId:productId}
      })
      console.log('response',response);
      if(response.data.success){
        setData(response.data.data);
      }
      
    } catch (error) {
     AxiosToastError(error);
    }finally{
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProductData();
  }, [params])
  console.log('data', data);

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='rounded-md min-h-56 max-h-56 h-full w-full  lg:min-h-[72vh] lg:max-h-[72vh]'>
          <img
            src={data?.image[image]}
            alt=''
            className='w-full h-full object-scale-down rounded-md'
          />
        </div>
        <div className='grid relative'>
          <div>
            {data?.image?.length > 1 && (
              <div className='flex items-center justify-center gap-2 w-full overflow-x-auto scrollbar-none mt-2'>
                {data?.image?.map((item, index) => (
                  <img
                    src={item}
                    alt=''
                    key={index}
                    className={`cursor-pointer w-20 h-20 min-h-20 min-w-20 object-scale-down rounded-md shadow-md border-2 border-[${index === image ? 'blue' : 'transparent'}] ${index === image ? 'border-blue-500' : ''}`}
                    onClick={() => setImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
          <div className='absolute top-1/2 left-2 right-2 flex justify-between'>
            <button>
              <FaAngleLeft size={20} />
            </button>
            <button>
              <FaAngleRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div>
        {/* <h1>{data?.name}</h1>
        <p>{data?.unit}</p>
        <p>{data?.price}</p>
        <p>{data?.quantity}</p> */}
      </div>
    </section>
  );
}

export default ProductDisplayPage
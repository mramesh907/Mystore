import React, { useEffect, useState } from 'react';
import UploadSubCategory from '../components/UploadSubCategory';
import AxiosToastError from '../utils/AxiosToastError.js';
import Axios from '../utils/Axios.js';
import SummaryApi from '../common/SummartApi.js';
import Table from '../components/Table.jsx';
import { createColumnHelper } from '@tanstack/react-table';
import ViewImage from '../components/ViewImage.jsx';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoPencilSharp } from 'react-icons/io5';
import EditSubCategory from '../components/EditSubCategory.jsx';
import DeleteCategory from '../components/DeleteCategory.jsx';
import toast from 'react-hot-toast';

const SubCategoryPage = () => {
  const [addSubCategory, setaddSubCategory] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const columnHelper = createColumnHelper();
  const [openViewImage, setopenViewImage] = useState('');
  const [openEdit, setOpenEdit] = useState(false);
  const [editData, seteditData] = useState({
    _id: '',
  });

  const [deleteSubCategory, setdeleteSubCategory] = useState({
    _id: '',
  });
  const [openDelete, setopenDelete] = useState(false);

  const fetchSubCategory = async () => {
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.getSubCategory,
        // method: 'get',
      });
      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchSubCategory();
  }, []);

  const handleDeleteSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteSubCategory,
        data: deleteSubCategory,
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        fetchSubCategory();
        setopenDelete(false);
        setdeleteSubCategory({ _id: '' });
      }

    } catch (error) {
      AxiosToastError(error);
    }
  }

  const column = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('image', {
      header: 'Image',
      cell: (info) => {
        return (
          <div className='flex justify-center items-center'>
            <img
              src={info.getValue()}
              className='w-20 pt-1 h-10 object-fill cursor-pointer'
              alt={info.getValue()}
              onClick={() => setopenViewImage(info.getValue())}
            />
          </div>
        );
      },
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: ({ row }) => {
        return (
          <>
            {row.original.category.map((c, index) => {
              return (
                <p
                  key={c._id + 'table'}
                  className='shadow-md px-1 inline-block'>
                  {c.name}
                </p>
              );
            })}
          </>
        );
      },
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex items-center justify-center gap-1'>
            <button
              onClick={() => {
                setOpenEdit(true);
                seteditData(row.original);
              }}
              className='text-sm border border-green-400 hover:bg-green-500 px-3 py-1 rounded'>
              <IoPencilSharp size={20} />
            </button>
            <button
            onClick={()=>{
              setopenDelete(true);setdeleteSubCategory(row.original)}}
            className='text-sm border border-red-400 hover:bg-red-600 px-3 py-1 rounded'>
              <AiOutlineDelete size={20} />
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <section>
      <div className=' p-2  bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Sub Categories</h2>
        <button
          onClick={() => setaddSubCategory(true)}
          className='text-sm border border-primary-400 hover:bg-primary-400 px-3 py-1 rounded'>
          Add Sub Category
        </button>
      </div>
      {/* Subcategory count */}
      <div className='p-2'>
        {data.length > 0 ? (
          <p className='text-sm font-semibold'>
            Total Sub Categories: {data.length}
          </p>
        ) : (
          !loading && (
            <p className='text-sm font-semibold'>No subcategories available.</p>
          )
        )}
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <Table data={data} column={column} />
      </div>

      {addSubCategory && (
        <UploadSubCategory
          close={() => {
            setaddSubCategory(false);
            fetchSubCategory(); // Trigger fetching after adding a subcategory
          }}
        />
      )}
      {openViewImage && (
        <ViewImage url={openViewImage} close={() => setopenViewImage('')} />
      )}
      {openEdit && (
        <EditSubCategory
          data={editData}
          close={() => {
            setOpenEdit(false);
            fetchSubCategory();
          }}
        />
      )}

      {openDelete && (
        <DeleteCategory
          cancel={() => {
            setopenDelete(false);
          }}
          close={() => {
            setopenDelete(false);
          }}
          confirm={handleDeleteSubCategory}
        />
      )}
    </section>
  );
};

export default SubCategoryPage;

import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBrand, getBrands } from '../features/brand/brandSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'title',
    dataIndex: 'title',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const BrandList = () => {
  const dispatch = useDispatch();
  const brandState = useSelector((state)=>state.brand.brands);
  const deletBrand = useSelector((state)=>state.brand);
  const {isError, deletedBrand} = deletBrand;
  
  useEffect(()=>{
   dispatch(getBrands())
  },[dispatch , deletedBrand]);
  const data1 = [];
for (let i = 0; i < brandState.length; i++) {
  data1.push({
    key: i+1,
    title: brandState[i].title,
    action: (
      <>
      <Link to={`/admin/edit-brand/${brandState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const brandId = brandState[i]._id;
        dispatch(deleteBrand(brandId))
        toast.success('brand Deleted')
      }} className='ms-3 mb-2 fs-5 text-danger btn'>
        <AiFillDelete />
      </button>
      </>
    )
  });
}
  return (
    <div>
        <h3 className='mb-4'>
            brand List
        </h3>
        <div>
          {data1.length > 0 ? <Table columns={columns} dataSource={data1} /> : "No brands Found"}
          </div>
          {isError && <div> Something Went Wrong </div>}
    </div>
  )
}

export default BrandList
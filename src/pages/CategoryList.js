import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletePcategory, getPcategories } from '../features/prod-category/pcatSlice';
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

const PcategoryList = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state)=>state.prodCat.pcategories);
  const deletPcategory = useSelector((state)=>state.prodCat);
  const {isError, deletedPcategory} = deletPcategory;
  
  useEffect(()=>{
   dispatch(getPcategories())
  },[dispatch , deletedPcategory]);
  const data1 = [];
for (let i = 0; i < categoryState.length; i++) {
  data1.push({
    key: i+1,
    title: categoryState[i].title,
    action: (
      <>
      <Link to={`/admin/edit-product-category/${categoryState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const categoryId = categoryState[i]._id;
        dispatch(deletePcategory(categoryId))
        toast.success('category Deleted')
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
            category List
        </h3>
        <div>
          {data1.length > 0 ? <Table columns={columns} dataSource={data1} /> : "No categories Found"}
          </div>
          {isError && <div> Something Went Wrong </div>}
    </div>
  )
}

export default PcategoryList
import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBcategory, getBcategories } from '../features/blog-category/bcatSlice';
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

const BlogCatList = () => {
  const dispatch = useDispatch();
  const categoryState = useSelector((state)=>state.blogCat.bcategories);
  const deletBcategory = useSelector((state)=>state.blogCat);
  const {isError, deletedBcategory} = deletBcategory;
  
  useEffect(()=>{
   dispatch(getBcategories())
  },[dispatch , deletedBcategory]);
  const data1 = [];
for (let i = 0; i < categoryState.length; i++) {
  data1.push({
    key: i+1,
    title: categoryState[i].title,
    action: (
      <>
      <Link to={`/admin/edit-blog-category/${categoryState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const categoryId = categoryState[i]._id;
        dispatch(deleteBcategory(categoryId))
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

export default BlogCatList
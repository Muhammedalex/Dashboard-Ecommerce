import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlog, getBlogs } from '../features/blog/blogSlice';
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

const BlogList = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state)=>state.blog.blogs);
  const deletBlog = useSelector((state)=>state.blog);
  const {isError, deletedBlog} = deletBlog;
  
  useEffect(()=>{
   dispatch(getBlogs())
  },[dispatch , deletedBlog]);
  const data1 = [];
for (let i = 0; i < blogState.length; i++) {
  data1.push({
    key: i+1,
    title: blogState[i].title,
    action: (
      <>
      <Link to={`/admin/edit-blog/${blogState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const BlogId = blogState[i]._id;
        dispatch(deleteBlog(BlogId))
        toast.success('Blog Deleted')
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
            Blog List
        </h3>
        <div>
          {data1.length > 0 ? <Table columns={columns} dataSource={data1} /> : "No Blogs Found"}
          </div>
          {isError && <div> Something Went Wrong </div>}
    </div>
  )
}

export default BlogList
import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteColor, getColors } from '../features/color/colorSlice';
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

const ColorList = () => {
  const dispatch = useDispatch();
  const colorState = useSelector((state)=>state.color.colors);
  const deletColor = useSelector((state)=>state.color);
  const {isError, deletedColor} = deletColor;
  
  useEffect(()=>{
   dispatch(getColors())
  },[dispatch , deletedColor]);
  const data1 = [];
for (let i = 0; i < colorState.length; i++) {
  data1.push({
    key: i+1,
    title: colorState[i].title,
    action: (
      <>
      <Link to={`/admin/edit-color/${colorState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const colorId = colorState[i]._id;
        dispatch(deleteColor(colorId))
        toast.success('Color Deleted')
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
            Color List
        </h3>
        <div>
          {data1.length > 0 ? <Table columns={columns} dataSource={data1} /> : "No Colors Found"}
          </div>
          {isError && <div> Something Went Wrong </div>}
    </div>
  )
}

export default ColorList
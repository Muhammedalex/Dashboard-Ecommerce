import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../features/customer/customerSlice';

const columns = [
  {
    title: 'id',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    // defaultSortOrder:"descend",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getUsers());
  },[dispatch]);
  const customerState = useSelector((state)=>state.customers.customers);
  // const {data} = customerState;
  const data1 = [];
for (let i = 0; i < customerState.length; i++) {
  if(customerState[i].role !== 'admin'){
    data1.push({
      key: i,
      name: customerState[i].firstname + ' ' + customerState[i].lastname,
      email: customerState[i].email,
      mobile: customerState[i].mobile,
    });
  }
}
// const onChange = (pagination , filters , sorter , extra ) =>{
//   console.log("params" , pagination , filters , sorter , extra)
// }
  return (
    <div>
        <h3 className='mb-4'>
            Customers
        </h3>
        <div>
          <Table columns={columns} dataSource={data1}  />
          </div>
    </div>
  )
}

export default Customers
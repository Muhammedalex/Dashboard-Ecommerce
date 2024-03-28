import React from 'react'
import { BsArrowDownLeft , BsArrowUpRight } from "react-icons/bs";
// import { BarChart } from '@mui/x-charts/BarChart';
import { Table } from 'antd';

const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const data1 = [];
for (let i = 0; i < 4; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {
 
  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
        <div className='d-flex justify-content-between flex-wrap align-items-center gap-3'>
          <div className='justify-content-between align-items-end d-flex gap-5  bg-white rounded-3 p-3 '>
            <div>
              <p className='mb-0'>
                Total
              </p>
              <h4 className='mb-0'>
                $1100
              </h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
            <h6 className='green'>
                <BsArrowUpRight style={{fontSize:"16px"}} className=' mb-1' /> 
                  32%
              </h6>
              <p className='mb-0'>
                Compare To April 2024
              </p>
            </div>
          </div>
          <div className='justify-content-between align-items-end d-flex gap-5  bg-white rounded-3 p-3 '>
            <div>
              <p className='mb-0'>
                Total
              </p>
              <h4 className='mb-0'>
                $1100
              </h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
              <h6 className='red'>
                <BsArrowDownLeft style={{fontSize:"16px"}} className=' mb-1' /> 
                  32%
              </h6>
              <p className='mb-0'>
                Compare To April 2024
              </p>
            </div>
          </div>
          <div className='justify-content-between align-items-end d-flex gap-5  bg-white rounded-3 p-3 '>
            <div>
              <p className='mb-0'>
                Total
              </p>
              <h4 className='mb-0'>
                $1100
              </h4>
            </div>
            <div className='d-flex flex-column align-items-end'>
            <h6 className='green'>
                <BsArrowUpRight style={{fontSize:"16px"}} className=' mb-1' /> 
                  32%
              </h6>
              <p className='mb-0'>
                Compare To April 2024
              </p>
            </div>
          </div>
        </div>
     <div className='d-flex align-items-center w-100'>
     {/* <div className='mt-4 flex-grow-1  align-self-start'>
          <h3 className='mb-4 align-self-start'>
            Income Statics
          </h3>
          <div>
          {/* <BarChart
      xAxis={[
        {
          id: 'barCategories',
          data: ['bar A', 'bar B', 'bar C'],
          scaleType: 'band',
        },
      ]}
      series={[
        {
          data: [2, 5, 3],
        },
      ]}
      width={500}
      height={300}
    /> */}
          {/* </div>
        </div> */} 
        <div className='mt-4 flex-grow-1'>
          <h3 className='mb-4'>
            Recent Orders
          </h3>
          <div>
          <Table columns={columns} dataSource={data1} pagination={1}/>
          </div>
        </div>
     </div>
        <div className='mt-4'>
          <h3>Resent Reviews</h3>
          <div >
            <div>

            </div>
            <div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard
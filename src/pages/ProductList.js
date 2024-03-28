import React, { useEffect } from 'react'
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../features/product/prodSlice';
import { Link } from 'react-router-dom';
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'react-toastify';


const columns = [
  {
    title: 'No',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter:(a,b)=>a.title.length - b.title.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter:(a,b)=>a.brand.length - b.brand.length,

  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter:(a,b)=>a.category.length - b.category.length,

  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter:(a,b)=>a.price.length - b.price.length,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state)=>state.product.products);
  const deletProduct = useSelector((state)=>state.product);
  const {isError, deletedProduct} = deletProduct;
  
  useEffect(()=>{
   dispatch(getProducts())
  },[dispatch , deletedProduct]);
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i,
      title: productState[i].title.slice(0,25)+ "...",
      brand: productState[i].brand,
      category: productState[i].category,
      price: `$ ${productState[i].price}`,
      action: (
        <>
        <Link to={`/admin/edit-product/${productState[i]._id}`} className='fs-5 text-primary'>
        <BiEdit />
      </Link>
      <button onClick={()=>{
        const productId = productState[i]._id;
        dispatch(deleteProduct(productId))
        toast.success('product Deleted')
      }} className='ms-3 mb-2 fs-5 text-danger btn'>
        <AiFillDelete />
      </button>
        </>
        ),

    });
  }
  return (
    <div>
    <h3 className='mb-4'>
        Product List
    </h3>
    <div>
      {data1.length > 0 ? <Table columns={columns} dataSource={data1} /> : "No Blogs Found"}
      </div>
      {isError && <div> Something Went Wrong </div>}
</div>
  )
}

export default ProductList
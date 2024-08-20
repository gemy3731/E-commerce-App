import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ProductItem from '../ProductItem/ProductItem';

export default function RecentProduct() {
    let [products,setProducts]= useState(null);
    useEffect(()=>{
        getAllProducts()
    },[])
    function getAllProducts() {
        axios.get("https://ecommerce.routemisr.com/api/v1/products")
        .then(({data})=>{
            setProducts(data.data)
        })
        .catch((err)=>{console.log(err)})
    }
    return (
        <>
    <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {products?.splice(0,20).map((product)=>{return <ProductItem key={product.id} product={product}/>
    })}
        </div>
    </div>
        </>
  )
}

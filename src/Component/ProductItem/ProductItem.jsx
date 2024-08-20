import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductItem({product}) {
  return (
    <div  className='product rounded-lg overflow-hidden'>
        <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-full' alt={product.title} />
                <div className='p-2 '>
                    <h2 className='text-[#4fa74f] '>{product.category.name}</h2>
                    <h2 className='font-bold my-2'>{product.title.split(" ").splice(0,2).join(" ")}</h2>
                    <div className='flex justify-between items-center'>
                        <span>{product.price} EGP</span>
                        <span>
                            <i className="fa-solid fa-star rating-color me-1"></i>
                            {product.ratingsAverage}
                        </span>
                    </div>
                </div>
        </Link>
                    <div className='flex justify-between items-center mt-2 p-2'>
                        <button className='btn bg-green-500 w-[80%] rounded-lg py-2 text-white font-bold'>+ Add to cart</button>
                        <i className="fa-solid fa-heart text-2xl"></i>
                    </div>
            </div>
  )
}

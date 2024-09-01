import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UserTokenContext';

export default function Order() {
 const {getUserOrders}= useContext(CartContext);
 const {userId}= useContext(UserTokenContext);
 useEffect(() => {
  if (userId) userOrders()
 }, [userId])
 
 async function userOrders() {
  console.log(userId.id);
  const res = await getUserOrders(userId.id)
  console.log(res);
 }
  return (
    <div>Order</div>
  )
}

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { Accordion } from "flowbite-react";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
``;

export default function Order() {
  const [orders, setOrders] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { getUserOrders } = useContext(CartContext);
  const { userId } = useContext(UserTokenContext);
  useEffect(() => {
    if (userId) userOrders();
  }, [userId]);

  async function userOrders() {
    const res = await getUserOrders(userId.id);
    setIsLoading(false);
    if (res.data.length > 0) {
      setOrders(res.data);
    } else {
      setOrders("There Are No Orders");
    }
  }
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Accordion>
          <Helmet>
            <title>Orders</title>
          </Helmet>
          {orders == "There Are No Orders" ? (
            <div className="text-center text-4xl mt-32 text-green-700 font-semibold">
              There Are No Orders
            </div>
          ) : (
            orders?.map((order) => (
              <Accordion.Panel key={order.id}>
                <Accordion.Title className=" bg-green-500 hover:bg-green-600 text-white text-lg">
                  <span className="me-20">
                    Time Of Order :{" "}
                    {order.createdAt.split("").splice(0, 10).join("")}
                  </span>
                  <span className="me-20">
                    Payment Method : {order.paymentMethodType.toUpperCase()}
                  </span>
                  <span className="me-20">
                    Is Order Delivered :{" "}
                    {order.isDelivered.toString().toUpperCase()}
                  </span>
                  <span className="me-20">
                    Total Order Price : {order.totalOrderPrice} EGP
                  </span>
                </Accordion.Title>
                <Accordion.Content>
                  <table className="w-full text-sm text-center rtl:text-right text-gray-500 boder  ">
                    <thead className="text-xl text-black bg-gray-50 border-b border-b-gray-300  ">
                      <tr>
                        <th scope="col" className="px-16 py-3 ">
                          <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3  ">
                          Quantity
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3 ">
                          Total Price per product
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {order.cartItems.map((item) => {
                        return (
                          <tr
                            key={item.product._id}
                            className="bg-white border-b border-b-gray-300 product "
                          >
                            <td className="p-4  ">
                              <img
                                src={item.product.imageCover}
                                className="w-16 md:w-32 max-w-full max-h-full"
                                alt={item.product.title}
                              />
                            </td>
                            <td className="px-6 py-4 font-semibold text-black  ">
                              {item.product.title}
                            </td>
                            <td className="px-6 py-4 ">
                              <span>{item.count}</span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-black ">
                              {item.price} EGP
                            </td>
                            <td className="px-6 py-4 font-semibold text-black ">
                              {item.price * item.count} EGP
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Accordion.Content>
              </Accordion.Panel>
            ))
          )}
        </Accordion>
      )}
    </>
  );
}

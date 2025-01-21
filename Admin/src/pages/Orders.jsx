import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the server
  const fetchOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while fetching orders.");
    }
  };

  // Handle order status change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully!");
        fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update order status.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while updating status.");
    }
  };

  // Fetch orders on component mount or token change
  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={index}
          >
            <img className="w-12" src={assets.parcel} alt="Parcel" />
            <div>
              {order.items.map((item, idx) => (
                <p className="py-0.5" key={idx}>
                  {item.name} x {item.quantity} <span>{item.size}</span>
                  {idx !== order.items.length - 1 && ","}
                </p>
              ))}
              <p className="mt-3 mb-2 font-medium">
                {`${order.address.firstName} ${order.address.lastName}`}
              </p>
              <div>
                <p>{order.address.street},</p>
                <p>
                  {`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="border border-gray-300 rounded py-1.5 px-3.5"
              name="status"
              id="status"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

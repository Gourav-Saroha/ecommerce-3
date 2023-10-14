import React from "react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../Layout/Layout";

const OrderStatus = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className="mt-14">
        <h3 className="text-lg font-semibold">Order Confirmed</h3>
        <p className="my-2">Order Number: {location.state}</p>
        <p className="my-2">Thank you for shopping with us!</p>
        <button className=" text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]">
          <Link to="/account/orders">View Order</Link>
        </button>
      </div>
    </Layout>
  );
};

export default OrderStatus;

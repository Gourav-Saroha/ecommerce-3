import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReq } from "../../API/APICalls";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = () => {
    getReq("user/orders")
      .then((data) => {
        setOrders(data.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="text-left m-6">
      <h3 className="font-semibold my-2">MY ORDERS</h3>
      {orders.length <= 0 && <p>No Orders Found!</p>}
      {orders.map((o) => (
        <div className="p-4 shadow-2xl rounded-lg text-sm" key={o._id}>
          <div className="my-2 text-sm">
            <p className="text-base font-semibold">Order Confirmed</p>
            <p>{o.createdAt}</p>
          </div>
          <p className="my-2">Order #{o._id}</p>
          <p className="my-2">Total: &#8377;{o.totalAmount}</p>
          <p>
            <span className="font-semibold"> Deliver To:</span> {o.address.Name}{" "}
            {o.address.AddressLine1},{o.address.City},{o.address.State}
          </p>
          <div className="my-2">
            {o.products.map((p) => (
              <div
                key={p.product._id}
                onClick={() => {
                  navigate(`/shop/${p.product._id}`);
                }}
                className="my-2 flex justify-start items-center border-[1px] border-gray-300 rounded-lg"
              >
                <div className="p-2 m-2">
                  <img
                    alt={p.product.productName}
                    className="w-32 h-auto"
                    src={p.product.productImage}
                  />
                </div>
                <div>
                  <p>{p.product.productName}</p>
                  <span>Quantity:{p.quantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;

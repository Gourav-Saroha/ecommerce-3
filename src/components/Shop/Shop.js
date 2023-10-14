import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getReq } from "../../API/APICalls";
import Filters from "../Filters/Filters";
import Layout from "../Layout/Layout";
import LoadingSpinner from "../util/LoadingSpinner";

const Shop = () => {
  const location = useLocation();
  const filterId = location.state;
  const [products, setProducts] = useState("");
  const [Loading, setLoading] = useState(true);

  //Get the Products
  useEffect(() => {
    setLoading(true);
    getReq("get-products")
      .then((data) => {
        setProducts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("err");
      });
  }, []);
  return (
    <Layout>
      {Loading && <LoadingSpinner />}
      {products && <Filters products={products} fId={filterId} />}
    </Layout>
  );
};

export default Shop;

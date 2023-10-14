import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "@mui/material/Rating";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartContext from "../Context/cart-context";
import LoadingSpinner from "../util/LoadingSpinner";
import SnackBar from "../util/SnackBar";
import Layout from "../Layout/Layout";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { getReq } from "../../API/APICalls";
const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [Loading, setLoading] = useState(true);
  const productId = useParams();
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  const getProduct = () => {
    setLoading(true);
    getReq(`get-product/${productId.id}`)
      .then((data) => {
        setProduct(data.data);
      })
      .then(() => {
        cartCtx.cart.forEach((p) => {
          p.productId._id === productId.id
            ? setIsProductInCart(true)
            : setIsProductInCart(false);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    cartCtx.cart.forEach((w) => {
      w.productId._id === productId.id
        ? setIsProductInCart(true)
        : setIsProductInCart(false);
    });

    cartCtx.wishlist.forEach((c) => {
      c.productId._id === productId.id
        ? setInWishlist(true)
        : setInWishlist(false);
    });
  });

  return (
    <Layout>
      {Loading && <LoadingSpinner />}
      <SnackBar />
      {product && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-4/5 my-6 shadow-xl rounded-lg">
            <div className="p-4">
              <img
                alt={product.productName}
                className=" lg:h-[35rem] lg:w-[35rem]"
                src={product.productImage}
              ></img>
            </div>
            <div className="p-4 mt-10 text-left">
              <p className="text-xl font-semibold pt-4">
                {product.productDescription}
              </p>
              <p className="py-2">{product.productBrand}</p>
              <div className="flex ">
                <Rating
                  name="read-only"
                  value={product.productRating}
                  readOnly
                />
                <span className="">({product.productReviews} Reviews)</span>
              </div>

              <p className="flex flex-col text-xl font-semibold py-1">
                &#8377; {product.productPrice}
                <span className="text-xs">Inclusive of all Taxes</span>
              </p>
              <div className="my-2 ">
                <div className="border-b-[0.5px] border-gray-300"></div>
              </div>
              <div className="my-2">
                <div className="py-[1px]">
                  <LocalShippingIcon style={{ fontSize: "20px" }} />

                  <span className="text-sm mx-2">Fast delivery available</span>
                </div>
                <div className="py-[1px]">
                  <CheckBoxIcon style={{ fontSize: "20px" }} />
                  <span className="text-sm mx-2">
                    Price displayed is inclusive of GST
                  </span>
                </div>
                <div className="py-[1px]">
                  <InventoryIcon style={{ fontSize: "20px" }} />
                  <span className="text-sm mx-2">Currently in stock</span>
                </div>
              </div>
              <div className="text-left flex justify-start items-center lg:flex-row flex-col">
                <button
                  onClick={() => {
                    isProductInCart
                      ? navigate("/cart")
                      : cartCtx.addToCart(product._id);
                  }}
                  className="text-white my-2 lg:my-4 p-2 px-5 rounded-lg border-[1px] border-[#0E3EDA] bg-[#0E3EDA] hover:bg-[#3053c8]"
                >
                  <ShoppingCartIcon />
                  {isProductInCart ? "Go to cart" : "Add to Cart"}
                </button>
                <button
                  className=" mx-2 my-2 lg:my-4 p-2 px-8 rounded-lg border-[1px] border-gray-600 hover:bg-gray-200"
                  onClick={() => {
                    inWishlist
                      ? cartCtx.removeFromWishlist(product._id)
                      : cartCtx.addToWishlist(product._id);
                  }}
                >
                  <span className="mx-1">
                    {inWishlist ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </span>
                  {inWishlist ? "Added in wishlist" : "Add to wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SingleProduct;

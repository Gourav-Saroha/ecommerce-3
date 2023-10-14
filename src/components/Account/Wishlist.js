import React, { useContext } from "react";
import CartContext from "../Context/cart-context";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout";
import CloseIcon from "@mui/icons-material/Close";
import SnackBar from "../util/SnackBar";

const Wishlist = () => {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <Layout>
      <SnackBar />
      <h3 className="p-4 text-xl font-semibold">MY WISHLIST</h3>
      {cartCtx.wishlist.length <= 0 && (
        <p className="lg:text-xl font-semibold my-10">
          No Products in Wishlist
        </p>
      )}
      <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cartCtx.wishlist &&
          cartCtx.wishlist.map((prod) => (
            <div
              key={prod.productId._id}
              className="flex flex-col w-full shadow-2xl "
            >
              <div className="flex justify-end items-center p-2">
                <CloseIcon
                  onClick={() => cartCtx.removeFromWishlist(prod.productId._id)}
                />
              </div>
              <div
                className="flex-1 flex justify-center items-center "
                onClick={() => {
                  navigate(`/shop/${prod.productId._id}`);
                }}
              >
                <img
                  alt={prod.productId.productName}
                  src={prod.productId.productImage}
                  className=" w-52 h-40 lg:h-52 bg-cover"
                ></img>
              </div>
              <div className="flex-1 flex justify-center items-center flex-col text-left">
                <div className="w-1/2">
                  <div>
                    <h6 className="font-semibold">
                      {prod.productId.productBrand}
                    </h6>
                  </div>
                  <div>
                    <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {prod.productId.productName}
                    </h4>
                    <span className="font-semibold">
                      &#8377;{prod.productId.productPrice}
                    </span>
                    <p className="flex">
                      <span>{prod.productId.productRating}</span>
                      <span className="text-lg text-yellow-400">
                        <AiFillStar />{" "}
                      </span>
                      | {prod.productId.productReviews}
                    </p>
                  </div>
                </div>
                <button
                  className="text-sm border-[0.5px] border-gray-400 my-2 p-[4px] px-4 rounded-lg  hover:bg-[#3053c8] hover:text-white"
                  onClick={() => {
                    cartCtx.addToCart(prod.productId._id);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default Wishlist;

import React, { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CartContext from "../Context/cart-context";

const ProductCard = ({ prod }) => {
  const navigate = useNavigate();
  const cartCtx = useContext(CartContext);
  return (
    <div key={prod._id} className="flex flex-col w-full  ">
      <div
        className="flex-1 flex justify-center items-center "
        onClick={() => {
          navigate(`/shop/${prod._id}`);
        }}
      >
        <img
          alt={prod.productName}
          src={prod.productImage}
          className=" w-52 lg:h-52 h-40 bg-cover cursor-pointer"
        ></img>
      </div>
      <div className="flex-1 flex justify-center items-center flex-col text-left">
        <div className="w-1/2">
          <h6 className="font-semibold">{prod.productBrand}</h6>
          <div>
            <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">
              {prod.productName}
            </h4>
            <span className="font-semibold text-sm">
              &#8377;
              {prod.productPrice}
            </span>
            <p className="flex">
              <span>{prod.productRating}</span>
              <span className="text-lg text-yellow-400">
                <AiFillStar />{" "}
              </span>
              | {prod.productReviews}
            </p>
          </div>
        </div>
        <div>
          <button
            className="w-full lg:w-auto text-sm border-[0.5px] border-gray-400 my-2 p-[4px] px-4 rounded-lg  hover:bg-[#3053c8] hover:text-white"
            onClick={() => {
              cartCtx.addToCart(prod._id);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React, { useContext } from "react";
import CartContext from "../Context/cart-context";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const CartItem = ({ p }) => {
  const cartCtx = useContext(CartContext);
  return (
    <div className="grid grid-cols-30/70 ">
      <div className="w-36 h-36 align-middle">
        <img
          className="bg-cover lg:w-full w-3/4"
          src={p.productId.productImage}
        ></img>
      </div>
      <div className="w-full">
        <p className="font-semibold p-1">{p.productId.productDescription}</p>
        <p>&#8377;{p.productId.productPrice}</p>
        <div className="flex justify-start items-center my-2">
          <button
            className="border-[1px] border-black rounded-lg p-[4px] mr-2"
            onClick={() => {
              cartCtx.addToCart(p.productId._id);
            }}
          >
            <AddIcon />
          </button>
          <p className="border-[1px] border-black rounded-lg p-[4px] px-4 mx-2">
            {p.quantity}
          </p>
          <button
            className="border-[1px] border-black rounded-lg p-[4px] mx-2"
            onClick={() => {
              cartCtx.removeFromCart(p.productId._id);
            }}
          >
            {p.quantity <= 1 ? <DeleteIcon /> : <RemoveIcon />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

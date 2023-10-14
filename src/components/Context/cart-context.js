import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { postReq, getReq, deleteReq } from "../../API/APICalls";
import { BackupOutlined } from "@mui/icons-material";
const CartContext = React.createContext({
  cartQuantity: 0,
  wishlistQuantity: 0,
  addToCart: (id) => {},
  removeFromCart: (id) => {},
  refreshCart: () => {},
  refreshWishlist: () => {},
  addToWishlist: (id) => {},
  removeFromWishlist: (id) => {},
  cart: [],
  wishlist: [],
  snack: "",
});

export const CartContextProvider = (props) => {
  const [quan, setQuan] = useState(null);
  const [wishlistquan, setWishlistQuan] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [snackbarContent, setSnackbar] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  //WISHLIST
  const updateWishlist = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      const data = await getReq("user/wishlist");
      setWishlistItems(data.data);
      let count = 0;
      data.data.forEach((element) => {
        count++;
      });
      setWishlistQuan(count);
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const addItemToWishlist = async (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      setSnackbar("Adding item to wishlist");
      setOpen(true);
      const data = await postReq(`user/add-to-wishlist/${id}`);
      setWishlistItems(data.data);
      updateWishlist();
      setSnackbar("Added Item to Wishlist");
      closeSnack();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemFromWishlist = async (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      setSnackbar("Removing item from wishlist");
      setOpen(true);
      const data = await deleteReq(`user/remove-from-wishlist/${id}`);
      setWishlistItems(data.data);
      updateWishlist();
      setSnackbar("Removed item from Wishlist");
      closeSnack();
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////SNACKBAR

  const closeSnack = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  ///////////////////CART

  const updateCart = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      const data = await getReq("user/cart");
      setCartItems(data.data);
      let count = 0;
      data.data.forEach((element) => {
        count++;
      });
      setQuan(count);
    } catch (err) {
      console.log(err);
    }
  }, [navigate]);

  const addItemToCart = async (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      setSnackbar("Adding item to the cart");
      setOpen(true);
      const data = await postReq(`user/add-to-cart/${id}`);
      setCartItems(data.data.items);
      updateCart();
      setSnackbar("Added Item to cart");
      closeSnack();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItemFromCart = async (id) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    try {
      setSnackbar("Removing Item from the cart");
      setOpen(true);
      const data = await deleteReq(`user/delete-from-cart/${id}`);
      setCartItems(data.data.items);
      updateCart();
      setSnackbar("Removed Item from the cart");
      closeSnack();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      updateCart();
      updateWishlist();
    }
  }, [updateCart, updateWishlist]);

  const contextValue = {
    addToCart: addItemToCart,
    removeFromCart: removeItemFromCart,
    cartQuantity: quan,
    cart: cartItems,
    refreshCart: updateCart,
    ////////////////////////
    addToWishlist: addItemToWishlist,
    removeFromWishlist: removeItemFromWishlist,
    wishlistQuantity: wishlistquan,
    wishlist: wishlistItems,
    refreshWishlist: updateWishlist,
    ////////////////////////
    snack: snackbarContent,
    open: open,
    setOpen: closeSnack,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
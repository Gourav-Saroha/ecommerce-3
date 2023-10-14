import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/auth-context";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Badge from "@mui/material/Badge";
import CartContext from "../Context/cart-context";
import EComLogo from "../Assets/L1.png";
import SearchBar from "./SearchBar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { MobileNavlinks } from "./NavLinks";

const Navigation = () => {
  const authCtx = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [count, setCount] = useState(0);
  const [wCount, setWCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    setCount(cartContext.cartQuantity);
    setWCount(cartContext.wishlistQuantity);
  }, [cartContext.cartQuantity, cartContext.wishlistQuantity]);


  return (
    <>
      <div className="fixed lg:block z-20 h-auto w-screen">
        <div className="px-3 h-16 bg-[#0E3EDA] flex justify-between lg:justify-around items-center ">
          <div
            className="lg:hidden flex justify-center items-center mx-1 "
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? (
              <CloseIcon style={{ fontSize: "2.1rem" }} />
            ) : (
              <MenuIcon style={{ fontSize: "2.1rem" }} />
            )}

            <h2 className="mx-3 font-semibold text-xl">ECOM.</h2>
          </div>

          <div ref={menuRef} className="absolute z-40 top-0 left-0 w-3/5">
            {isOpen && <MobileNavlinks setIsOpen={setIsOpen} />}
          </div>

          <nav className="hidden lg:flex justify-center items-center">
            <Link to="">
              <img
                alt="ECOM Logo"
                src={EComLogo}
                className="h-10 w-32"
                onClick={() => {
                  navigate("/");
                }}
              ></img>
            </Link>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white mx-6" : "mx-6"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) => (isActive ? "text-white" : "")}
            >
              Shop Now
            </NavLink>
          </nav>

          <div className="hidden lg:block w-96">
            <SearchBar />
          </div>
          <div className="lg:hidden flex justify-center items-center ">
            <Badge
              badgeContent={authCtx.isAuth ? wCount : 0}
              color="primary"
              className="mx-2"
            >
              <Link to="/wishlist">
                <FavoriteIcon />
              </Link>
            </Badge>
            <Badge
              badgeContent={authCtx.isAuth ? count : 0}
              color="primary"
              className="mx-2"
            >
              <Link to="/cart">
                <ShoppingCartIcon />
              </Link>
            </Badge>
          </div>

          <div className="hidden lg:flex justify-evenly items-center flex-row w-72">
            <Link to="/account" className="text-lg">
              <AccountCircleIcon className="text-lg" />
              {authCtx.isAuth && (
                <p className="text-sm">Hi,{authCtx.userName}</p>
              )}
              {!authCtx.isAuth && <p className="text-sm">Login</p>}
            </Link>
            <Badge badgeContent={authCtx.isAuth ? wCount : 0} color="primary">
              <Link to="/wishlist">
                <FavoriteIcon />
                <p>Wishlist</p>
              </Link>
            </Badge>
            <Badge badgeContent={authCtx.isAuth ? count : 0} color="primary">
              <Link to="/cart">
                <ShoppingCartIcon />
                <p>Cart</p>
              </Link>
            </Badge>
          </div>
        </div>
        <div className="bg-white lg:hidden p-2">
          <SearchBar />
        </div>
      </div>
      <div className="lg:h-16 h-28 relative top-[-10rem] lg:top-[-4rem] "></div>
    </>
  );
};

export default Navigation;

import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthContext from "../Context/auth-context";
import CloseIcon from "@mui/icons-material/Close";

const NavLinks = () => {
  return <div>NavLinks</div>;
};

export const MobileNavlinks = ({ setIsOpen }) => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="bg-white h-screen">
      <div className="bg-gray-600">
        <div className="text-right p-2 ">
          <CloseIcon
            style={{ fontSize: "2.1rem" }}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </div>
        <div className="p-2 pb-4 ">
          <AccountCircleIcon style={{ fontSize: "3.1rem" }} />
          {authCtx.isAuth && <p className="p-2 text-xl">{authCtx.userName}</p>}
          {!authCtx.isAuth && (
            <Link
              to="/login"
              className="p-2 text-xl"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <nav
        className=" flex flex-col h-fit text-left p-4 text-xl"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA] my-2" : " my-2"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA]  my-2" : " my-2"
          }
        >
          Shop Now
        </NavLink>
        <NavLink
          to="/account"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA]  my-2" : "my-2"
          }
          end
        >
          Profile
        </NavLink>
        <NavLink
          to="/account/orders"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA]  my-2" : "my-2"
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/account/address"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA]  my-2" : "my-2"
          }
        >
          Addresses
        </NavLink>
        <NavLink
          to="/account/setting"
          className={({ isActive }) =>
            isActive ? "text-[#0E3EDA]  my-2" : "my-2"
          }
        >
          Settings
        </NavLink>
      </nav>
    </div>
  );
};
export default NavLinks;

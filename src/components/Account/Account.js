import { NavLink, Outlet } from "react-router-dom";
import Layout from "../Layout/Layout";

const Account = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center ">
        <div className="text-xl lg:text-3xl p-4 my-4 font-semibold">
          ACCOUNT
        </div>
      </div>
      <div className="hidden lg:block border-b-[0.5px] border-gray-400 mx-80"></div>
      <div className="lg:hidden block border-b-[0.5px] border-gray-400 mx-2"></div>

      <div className="flex justify-center items-center flex-row">
        <div className="grid grid-cols-1 lg:grid-cols-20/80 lg:divide-x divide-gray-400 lg:w-3/5 w-full">
          <nav className="px-4 hidden lg:grid grid-cols-1 divide-y divide-gray-400  w-auto font-semibold text-xl h-[15rem]">
            <NavLink
              to="/account"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
              end
            >
              Profile
            </NavLink>
            <NavLink
              to="/account/orders"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
            >
              Orders
            </NavLink>
            <NavLink
              to="/account/address"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
            >
              Address
            </NavLink>
            <NavLink
              to="/account/setting"
              className={({ isActive }) =>
                isActive ? "py-4 font-bold" : "py-4 font-thin"
              }
            >
              Setting
            </NavLink>
          </nav>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;

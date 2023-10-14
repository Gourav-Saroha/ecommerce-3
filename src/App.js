import Landing from "./components/Landing/Landing";
import Shop from "./components/Shop/Shop";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/util/PrivateRoute";
import Account from "./components/Account/Account";
import Profile from "./components/Account/Profile";
import Signup from "./pages/Signup";
import SearchPage from "./pages/SearchPage";
import SingleProduct from "./components/Filters/SingleProduct";
import Wishlist from "./components/Account/Wishlist";
import Orders from "./components/Account/Orders";
import Cart from "./components/Cart/Cart";
import Address from "./components/Account/Address";
import Setting from "./components/Account/Setting";
import OrderStatus from "./components/Cart/OrderStatus";
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="font-Sans text-center ">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/order" element={<OrderStatus />}></Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/" element={<Landing />} />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        >
          <Route path="" element={<Profile />} exact></Route>
          <Route path="address" element={<Address />}></Route>
          <Route path="setting" element={<Setting />}></Route>
          <Route path="orders" element={<Orders />}></Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;

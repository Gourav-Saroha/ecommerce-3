import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { postReq } from "../API/APICalls";
import AuthContext from "../components/Context/auth-context";
import CartContext from "../components/Context/cart-context";
import Form from "../components/Form/Form";
import Layout from "../components/Layout/Layout";
import { LoginDetails } from "../components/util/TempLogin";
import LoadingSpinner from "../components/util/LoadingSpinner";
const Login = () => {
  const authCtx = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const registerMsg = location.state;
  const autoLogout = (miliseconds) => {
    setTimeout(() => {
      authCtx.logout();
      navigate("/login");
    }, miliseconds);
  };

  const setLoginDetails = () => {
    setEmail(LoginDetails.email);
    setPassword(LoginDetails.password);
  };
  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!email && !password) {
      setErrorMsg("Please fill all fields");
      return;
    }
    if (!email) {
      setErrorMsg("Please enter valid email");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter valid password");
      return;
    }

    postReq("auth/login", { email, password })
      .then((data) => {
        authCtx.login(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        authCtx.userNameHandler(data.userName);
        localStorage.setItem("userName", data.userName);
        const remainingMiliseconds = 60 * 60 * 1000;
        const expiryDate = new Date().getTime() + remainingMiliseconds;
        localStorage.setItem("expiryDate", expiryDate);
        autoLogout(remainingMiliseconds);
        cartContext.refreshCart();
        cartContext.refreshWishlist();
        setLoading(false);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <Layout>
      <Form>
        {loading && <LoadingSpinner />}
        {!loading && (
          <form className="w-full shadow-xl " onSubmit={loginHandler}>
            <h1 className="text-2xl font-bold my-4">LOGIN</h1>
            {registerMsg && <p>{registerMsg}</p>}
            <div className="my-5">
              <input
                className={`w-4/5 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                  errorMsg.toLowerCase().includes("email" && "fields")
                    ? "border-red-600"
                    : ""
                }`}
                type="text"
                placeholder="Enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrorMsg("");
                }}
              ></input>
            </div>
            <div className="my-4">
              <input
                className={`w-4/5 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                  errorMsg.toLowerCase().includes("password" && "fields")
                    ? "border-red-600"
                    : ""
                }`}
                type="password"
                placeholder="Enter your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
              ></input>
            </div>
            {errorMsg && <p className="m-2 text-red-500 text-xs">{errorMsg}</p>}
            <button
              className="w-4/5 text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
              type="submit"
            >
              Login
            </button>
            <button
              onClick={setLoginDetails}
              className=" w-4/5 rounded-lg border-[1px] border-gray-300 p-2 hover:bg-[#3053c8] hover:text-white"
            >
              Login with test credentials
            </button>
            <div className="py-2 my-2 text-center">
              New user?{" "}
              <Link to="/signup" className="underline">
                Signup
              </Link>
            </div>
          </form>
        )}
      </Form>
    </Layout>
  );
};

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postReq } from "../API/APICalls";
import Form from "../components/Form/Form";
import Layout from "../components/Layout/Layout";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (!firstName && !lastName && !password && !confirmPassword) {
      setErrorMsg("Please fill all fields");
      return;
    }
    if (firstName.length === 0) {
      setErrorMsg("Please enter Valid First Name");
      return;
    }
    if (lastName.length === 0) {
      setErrorMsg("Please enter Valid Last Name");
      return;
    }
    if (email.length === 0) {
      setErrorMsg("Please enter Valid Email");
      return;
    }
    if (password.length < 4) {
      setErrorMsg("Password should be minimum 5 Characters long");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    postReq("auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
      .then((res) => {
        navigate("/login", { state: "Successfully Registered! Please login" });
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <Layout>
      <Form>
        <form className="w-full text-left shadow-xl " onSubmit={submitHandler}>
          <h1 className="text-2xl font-bold my-4 text-center">SIGNUP</h1>
          <div className="m-2  my-3 lg:m-5 grid grid-cols-30/70 ">
            <label id="fName" className="p-2 font-semibold ">
              First Name*
            </label>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
                setErrorMsg("");
              }}
              type="text"
              placeholder="First Name"
              className={`focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                errorMsg.toLowerCase().includes("first") ? "border-red-600" : ""
              }`}
            ></input>
          </div>

          <div className="m-2 my-3 lg:m-5 grid grid-cols-30/70">
            <label id="lName" className="p-2 font-semibold">
              Last Name*
            </label>
            <input
              onChange={(e) => {
                setLastName(e.target.value);
                setErrorMsg("");
              }}
              type="text"
              placeholder="Last Name"
              className={`focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                errorMsg.toLowerCase().includes("last") ? "border-red-600" : ""
              }`}
            ></input>
          </div>
          <div className="m-2  my-3 lg:m-5 grid grid-cols-30/70">
            <label id="email" className="p-2 font-semibold">
              Email*
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
              type="text"
              placeholder="Email"
              className={`focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                errorMsg.toLowerCase().includes("email") ? "border-red-600" : ""
              }`}
            ></input>
          </div>
          <div className="m-2 my-3 lg:m-5 grid grid-cols-30/70">
            <label id="pass1" className="p-2 font-semibold">
              Password*
            </label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMsg("");
              }}
              type="password"
              placeholder="Password"
              className={`focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                errorMsg.toLowerCase().includes("password")
                  ? "border-red-600"
                  : ""
              }`}
            ></input>
          </div>
          <div className="m-2 my-3 lg:m-5 grid grid-cols-30/70">
            <label id="pass2" className="p-2 font-semibold">
              Confirm Password*
            </label>
            <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMsg("");
              }}
              type="password"
              placeholder="Confirm your password"
              className={`focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
                errorMsg.toLowerCase().includes("password")
                  ? "border-red-600"
                  : ""
              }`}
            ></input>
          </div>
          <div className="text-center">
            {errorMsg && <p className="m-5 text-red-500 text-xs">{errorMsg}</p>}
            <button
              type="submit"
              className="w-[93%] m-5 text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
            >
              Register
            </button>
            <div className="py-2 my-2 text-center">
              Already registered?
              <Link to="/login" className="underline">
                Login here{" "}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </Layout>
  );
};

export default Signup;

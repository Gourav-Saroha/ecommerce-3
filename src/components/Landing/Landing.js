import React from "react";
import { Link, useNavigate } from "react-router-dom";
import bg from "../Assets/w.jpg";
import Logo from "../Assets/L1.png";

import Mobile from "../Assets/Categories/Mobile.jpg";
import Laptop from "../Assets/Categories/Laptop.jpg";
import Watch from "../Assets/Categories/watch.jpg";
import Headphones from "../Assets/Categories/Headphones.jpg";

import samsung from "../Assets/Brands/samsung.png";
import apple from "../Assets/Brands/apple.png";
import dell from "../Assets/Brands/dell.png";
import asus from "../Assets/Brands/asus.jpg";
import Layout from "../Layout/Layout";

const Landing = () => {
  const navigate = useNavigate();

  const filterHandler = (id, type) => {
    const detail = {
      id: id,
      type: type,
    };
    navigate("/shop", { state: detail });
  };

  const categoriesArray = [
    {
      background: Mobile,
      name: "Mobile",
    },
    {
      background: Laptop,
      name: "Laptop",
    },
    {
      background: Headphones,
      name: "Headphone",
    },
    {
      background: Watch,
      name: "Watch",
    },
  ];

  const brandsArray = [
    {
      background: samsung,
      name: "Samsung",
    },
    {
      background: asus,
      name: "Asus",
    },
    {
      background: dell,
      name: "Dell",
    },
    {
      background: apple,
      name: "Apple",
    },
  ];

  return (
    <Layout>
      <div className="">
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="bg-cover w-full lg:h-[65vh] h-[45vh] "
        >
          <img
            alt="ECOM Logo"
            src={Logo}
            className="inline lg:h-16 h-12 mt-14 mb-2"
          />
          <h1 className="font-semibold lg:text-6xl text-4xl my-4">
            SUMMER SALE
          </h1>
          <h4 className="font-semibold  text-2xl">
            Upto<span className="font-bold text-3xl"> 20% Off</span> on Various
            products
          </h4>
          <button className="text-white my-6 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]">
            <Link to="/shop">Shop Now</Link>
          </button>
        </div>
        <section>
          <h1 className="lg:text-4xl text-2xl font-semibold mt-8">
            FEATURED CATEGORIES
          </h1>
          <Dividerr />
          <div className="flex justify-center items-center my-24">
            <div className="lg:w-3/5 w-full grid lg:grid-cols-4 grid-cols-2 lg:h-48 h-96 gap-2 lg:gap-8">
              {categoriesArray.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    filterHandler(item.name, "category");
                  }}
                  className="w-48 cursor-pointer  transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl"
                >
                  <img
                    alt={item.name}
                    src={item.background}
                    className="bg-cover w-full h-auto border-2 border-teal-500 rounded-xl "
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h1 className="lg:text-4xl text-2xl font-semibold mt-8">
            FEATURED BRANDS
          </h1>
          <div className="flex justify-center items-center my-2">
            <Dividerr />
          </div>
          <div className="flex justify-center items-center my-24">
            <div className="lg:w-3/5 mx-6 w-full grid lg:grid-cols-4 grid-cols-2 lg:h-48 h-96 gap-2 lg:gap-8">
              {brandsArray.map((item) => (
                <div
                  key={item.name}
                  onClick={() => {
                    filterHandler(item.name, "brand");
                  }}
                  className="cursor-pointer transition-all border-8 border-transparent scale-105 hover:border-0 hover:text-xl flex justify-center items-center"
                >
                  <img
                    alt={item.name}
                    src={item.background}
                    className="bg-cover w-full h-auto "
                  ></img>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Landing;

export const Dividerr = () => {
  return (
    <div className="flex justify-center items-center my-2">
      <div className="w-[120px] border-b-[6px] border-black"></div>
    </div>
  );
};

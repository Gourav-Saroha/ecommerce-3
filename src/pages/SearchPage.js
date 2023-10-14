import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { AiFillStar } from "react-icons/ai";
import CartContext from "../components/Context/cart-context";

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchItems = location.state;
  const searchResults = searchItems.data.data;
  const keyword = searchItems.searchItem;
  const cartCtx = useContext(CartContext);

  return (
    <Layout>
      <div className="my-2 p-2">
        <p className="text-xl font-semibold">
          Search Results for "{keyword}"- {searchResults.length} items
        </p>
        <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
          {searchResults.length > 0 &&
            searchResults.map((prod) => (
              <div key={prod._id} className="flex flex-col w-full ">
                <div
                  className="flex-1 flex justify-center items-center "
                  onClick={() => {
                    navigate(`/shop/${prod._id}`);
                  }}
                >
                  <img
                    alt={prod.productName}
                    src={prod.productImage}
                    className="w-52 h-40 lg:h-52 bg-cover"
                  ></img>
                </div>
                <div className="flex-1 flex justify-center items-center flex-col text-left">
                  <div className="w-1/2">
                    <div>
                      <h6 className="font-semibold">{prod.productBrand}</h6>
                    </div>
                    <div>
                      <h4 className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {prod.productName}
                      </h4>
                      <span className="font-semibold">
                        &#8377;{prod.productPrice}
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
                  <button
                    className="text-sm border-[0.5px] border-gray-400 my-2 p-[4px] px-4 rounded-lg  hover:bg-[#3053c8] hover:text-white"
                    onClick={() => {
                      cartCtx.addToCart(prod._id);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        {searchResults.length <= 0 && <p>No products found</p>}
      </div>
    </Layout>
  );
};

export default SearchPage;

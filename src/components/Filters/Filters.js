import React, { useCallback, useEffect, useState } from "react";
import SnackBar from "../util/SnackBar";
import ProductCard from "./ProductCard";
const Filters = (props) => {
  const categoryFilters = [
    { id: 1, name: "Mobile", type: "category" },
    { id: 2, name: "Laptop", type: "category" },
    { id: 3, name: "Headphone", type: "category" },
    { id: 4, name: "Watch", type: "category" },
  ];
  const brandFilters = [
    { id: "b1", name: "Apple", type: "brand" },
    { id: "b2", name: "Samsung", type: "brand" },
    { id: "b3", name: "Asus", type: "brand" },
    { id: "b4", name: "Sony", type: "brand" },
    { id: "b5", name: "Jbl", type: "brand" },
    { id: "b6", name: "Realme", type: "brand" },
    { id: "b7", name: "Dell", type: "brand" },
  ];

  const [filtering, setFiltering] = useState(false);
  const [checked, setChecked] = useState([]);
  const [bChecked, setBChecked] = useState([]);
  const [fProd, setFProd] = useState([]);
  const [products, setProducts] = useState(props.products);
  const [c, setC] = useState({ lth: false, htl: false });
  let filteredProducts = [];

  //FILTERING LOGICC

  const filterHandler = useCallback(
    (id, type) => {
      setFiltering(true);
      const currentIndex = checked.indexOf(id);
      const newChecked = [...checked];
      if (currentIndex === -1) {
        newChecked.push(id);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setChecked(newChecked);
    },
    [checked]
  );

  const brandfilterHandler = useCallback(
    (id, type) => {
      setFiltering(true);
      const currentIndex = bChecked.indexOf(id);
      const newChecked = [...bChecked];
      if (currentIndex === -1) {
        newChecked.push(id);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      setBChecked(newChecked);
    },
    [bChecked]
  );

  if (filtering) {
    if (checked.length > 0 || bChecked.length > 0) {
      filteredProducts = props.products.filter((product) => {
        if (
          checked.includes(product.productCategory) ||
          bChecked.includes(product.productBrand)
        ) {
          return product;
        }
        return null;
      });
      setFProd(filteredProducts);
    }
    if (checked.length > 0 && bChecked.length > 0) {
      filteredProducts = props.products.filter((p) => {
        if (
          checked.includes(p.productCategory) &&
          bChecked.includes(p.productBrand)
        ) {
          return p;
        }
        return null;
      });
      setFProd(filteredProducts);
    }
    setFProd(filteredProducts);
    setFiltering(false);
  }

  useEffect(() => {
    if (props.fId) {
      if (props.fId.type === "category") {
        filterHandler(props.fId.id);
      } else {
        brandfilterHandler(props.fId.id);
      }
    }
  }, [props.fId]);

  useEffect(() => {
    if (fProd.length > 0) {
      setProducts(fProd);
    } else if (fProd.length <= 0) {
      setProducts(props.products);
    }
  }, [fProd]);

  //SORTING LOGIC
  const SortHandler = (value) => {
    let p;
    if (value === "lth") {
      p = products.sort((a, b) => {
        return Number(a.productPrice) - Number(b.productPrice);
      });
    }
    if (value === "htl") {
      p = products.sort((a, b) => {
        return Number(b.productPrice) - Number(a.productPrice);
      });
    }
    setProducts([...p]);
  };

  let content;
  content = (
    <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((prod) => (
        <ProductCard prod={prod} key={prod._id} />
      ))}
    </div>
  );

  if ((bChecked.length > 0 || checked.length > 0) && fProd.length <= 0) {
    content = <h1 className="text-2xl font-bold my-20">No Products found!!</h1>;
  }

  const setRadio = (e) => {
    setC(() => {
      return {
        lth: false,
        htl: false,
        [e.target.value]: true,
      };
    });
  };

  const s = () => {
    setC(() => ({ lth: false, htl: false }));
    setProducts(props.products);
  };

  return (
    <div className="flex justify-start items-start">
      <SnackBar />
      <div className="hidden lg:block ml-16 w-[15%] my-8 ">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold ">FILTERS</h3>
          <button
            onClick={() => {
              setBChecked([]);
              setChecked([]);
              setFiltering(true);
              s();
            }}
            className="underline leading-4"
          >
            Clear All
          </button>
        </div>
        <Divider />
        <div className="text-left">
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">SORT</li>
            <li>
              <label>
                <input
                  checked={c.htl}
                  type="radio"
                  id="htl"
                  value="htl"
                  name="sorting"
                  onChange={(e) => {
                    setRadio(e);
                    SortHandler("htl");
                  }}
                  className="mr-2 h-4 w-4"
                />
                High to low
              </label>
            </li>
            <li>
              <label>
                <input
                  checked={c.lth}
                  type="radio"
                  id="lth"
                  value="lth"
                  name="sorting"
                  onChange={(e) => {
                    setRadio(e);
                    SortHandler("lth");
                  }}
                  className="mr-2 h-4 w-4"
                />
                Low to High
              </label>
            </li>
          </ul>
          <Divider />
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">CATEGORY</li>
            {categoryFilters.map((value, index) => (
              <li key={index} className="mt-1">
                <label>
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4"
                    onChange={() => {
                      filterHandler(value.name, value.type);
                    }}
                    checked={checked.indexOf(value.name) === -1 ? false : true}
                  />
                  {value.name}
                </label>
              </li>
            ))}
          </ul>
          <Divider />
          <ul className="my-2">
            <li className="text-[1.1rem] font-bold p-[2px] my-2">BRAND</li>
            {brandFilters.map((value, index) => (
              <li key={index} className="mt-1">
                <label>
                  <input
                    className="mr-2 h-4 w-4"
                    type="checkbox"
                    onChange={() => {
                      brandfilterHandler(value.name, value.type);
                    }}
                    checked={bChecked.indexOf(value.name) === -1 ? false : true}
                  />
                  {value.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-full lg:w-[80%]">{content}</div>
    </div>
  );
};

export const Divider = () => {
  return (
    <div className="my-2">
      <div className="border-b-[0.5px] border-gray-400"></div>
    </div>
  );
};

export default Filters;

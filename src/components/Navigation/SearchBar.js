import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch, GoX } from "react-icons/go";
import { getReq } from "../../API/APICalls";

const suggestions = [
  "Mobile",
  "Laptop",
  "Headphone",
  "Watch",
  "Samsung",
  "Apple",
  "Lenovo",
  "Jbl",
  "Realme",
  "Dell",
  "Asus",
];

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggest, setSuggest] = useState([]);
  const inputRef = useRef();
  const suggestionRef = useRef();
  const navigate = useNavigate();
  const changeHandler = (e) => {
    let array = [];
    setSearchItem(e.target.value);
    if (searchItem.length > 0) {
      array = suggestions.filter((item) => {
        return item.toLowerCase().includes(searchItem.toLowerCase());
      });
    }
    setSuggest(array);
  };

  const getSuggestions = () => {
    if (suggest.length === 0) {
      return;
    }
    return (
      <ul
        ref={suggestionRef}
        className="absolute top-10 bg-white w-full text-left rounded-sm"
      >
        {suggest &&
          suggest.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:bg-gray-300 my-2 px-1"
              onClick={(e) => {
                inputRef.current.value = item;
                submitHandler(e);
                setSuggest([]);
              }}
            >
              {item}
            </li>
          ))}
      </ul>
    );
  };
  useEffect(() => {
    let handler = (e) => {
      if (suggest.length > 0) {
        if (!suggestionRef.current.contains(e.target)) {
          setSuggest([]);
        }
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const submitHandler = (e) => {
    // e.preventDefault();
    if (inputRef.current.value.length <= 0 || searchItem.length <= 0) {
      return;
    }
    getReq(`search?searchTerm=${inputRef.current.value}`)
      .then((data) => {
        const searchData = {
          data: data,
          searchItem: inputRef.current.value,
        };
        navigate("/search", { state: searchData });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="flex justify-center items-center flex-row relative">
      <input
        className="focus:outline-none focus:shadow-outline w-full p-2 rounded-lg"
        type="text"
        onChange={changeHandler}
        ref={inputRef}
        placeholder="Type to search"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            submitHandler();
            setSuggest([]);
          }
        }}
      ></input>
      {searchItem && getSuggestions()}
      {searchItem && (
        <button
          className="absolute right-12 text-[1.4rem]"
          onClick={() => {
            inputRef.current.value = "";
            setSearchItem("");
          }}
        >
          <GoX />
        </button>
      )}
      <button
        className="absolute right-4 text-[1.4rem]"
        onClick={(e) => {
          submitHandler(e);
        }}
        type="submit"
      >
        <GoSearch />
      </button>
    </section>
  );
};

export default SearchBar;

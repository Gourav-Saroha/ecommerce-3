import React, { useEffect, useState } from "react";
import { postReq, putReq } from "../../API/APICalls";
import Modal from "../Modal/Modal";
import { AddressDetails } from "../util/TempLogin";

const AddressForm = (props) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Maharashtra");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [mobile, setMobile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let options = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Goa", label: "Goa" },
  ];

  useEffect(() => {
    if (props.isEdit) {
      const addressData = props.addressData;
      setCountry(addressData.Country);
      setName(addressData.Name);
      setAddress(addressData.AddressLine1);
      setState(addressData.State);
      setPincode(addressData.Pincode);
      setMobile(addressData.Mobile);
      setCity(addressData.City);
    }
  }, [props.addressData, props.isEdit]);

  const cancelHandler = () => {
    props.isEdit ? props.setIsEdit(false) : props.setIsAddNew(false);
  };
  const setDummyDetails = () => {
    setCountry(AddressDetails.country);
    setName(AddressDetails.name);
    setAddress(AddressDetails.address);
    setState(AddressDetails.state);
    setPincode(AddressDetails.pincode);
    setMobile(AddressDetails.mobile);
    setCity(AddressDetails.city);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name) {
      setErrorMsg("Name cannot be empty");
      return;
    }
    if (!country) {
      setErrorMsg("Country cannot be empty");
      return;
    }
    if (!address) {
      setErrorMsg("Address cannot be empty");
      return;
    }
    if (!state) {
      setErrorMsg("State cannot be empty");
      return;
    }
    if (!city) {
      setErrorMsg("city cannot be empty");
      return;
    }
    if (!pincode) {
      setErrorMsg("Pincode cannot be empty");
      return;
    }
    if (pincode.length < 6 || pincode.length > 6) {
      setErrorMsg("Enter Valid Pincode of 6 digits");
      return;
    }
    if (!mobile) {
      setErrorMsg("Mobile Number cannot be empty");
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      setErrorMsg("Enter Valid Mobile Number of 10 digits");
      return;
    }

    let fun;
    let url = "add-address";
    fun = postReq;
    if (props.isEdit) {
      fun = putReq;
      url = `edit-address/${props.addressData._id}`;
    }
    fun(url, {
      name,
      address,
      city,
      state,
      mobile,
      pincode,
      country,
    })
      .then((data) => {
        props.setAddresses(data.data);
        cancelHandler();
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Modal>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="text-sm lg:text-base absolute w-11/12 lg:w-2/5 top-[22%] left-[4%] lg:top-[15%] lg:left-[30%] p-4 flex justify-center  flex-col bg-white"
      >
        <h4 className="text-xl font-semibold">Add Address</h4>
        <label>
          <select
            className={`w-full my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
              errorMsg.toLowerCase().includes("country") ? "border-red-600" : ""
            }`}
            defaultValue={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setErrorMsg("");
            }}
          >
            <option value="India">India</option>
          </select>
        </label>

        <input
          type="text"
          placeholder="Enter name"
          name="name"
          onChange={(e) => {
            setName(e.target.value);
            setErrorMsg("");
          }}
          defaultValue={name}
          className={`my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
            errorMsg.toLowerCase().includes("name") ? "border-red-600" : ""
          }`}
        />
        <input
          type="text"
          placeholder="Enter House no., street, colony"
          onChange={(e) => {
            setAddress(e.target.value);
            setErrorMsg("");
          }}
          defaultValue={address}
          className={`my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
            errorMsg.toLowerCase().includes("address") ? "border-red-600" : ""
          }`}
        />
        <input
          type="text"
          placeholder="Enter city"
          onChange={(e) => {
            setCity(e.target.value);
            setErrorMsg("");
          }}
          defaultValue={city}
          className={`my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
            errorMsg.toLowerCase().includes("city") ? "border-red-600" : ""
          }`}
        />
        <label>
          <select
            onChange={(e) => {
              setState(e.target.value);
              setErrorMsg("");
            }}
            defaultValue={state}
            className={`w-full my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
              errorMsg.toLowerCase().includes("state") ? "border-red-600" : ""
            }`}
          >
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
        <input
          type="number"
          placeholder="Enter pincode"
          onChange={(e) => {
            setPincode(e.target.value);
            setErrorMsg("");
          }}
          defaultValue={pincode}
          className={`my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
            errorMsg.toLowerCase().includes("pincode") ? "border-red-600" : ""
          }`}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          onChange={(e) => {
            setMobile(e.target.value);
            setErrorMsg("");
          }}
          defaultValue={mobile}
          className={`my-2 focus:outline-none focus:shadow-outline rounded-lg border-[1px] border-gray-300 p-2 ${
            errorMsg.toLowerCase().includes("mobile") ? "border-red-600" : ""
          }`}
        />
        {errorMsg && <p className="m-2 text-red-500 text-xs">{errorMsg}</p>}
        <section className="flex justify-start items-center text-sm">
          <button
            type="submit"
            className=" mr-1 text-white my-4 p-2 px-5 rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
          >
            Save
          </button>
          <button
            onClick={() => {
              setDummyDetails();
            }}
            className="mx-1 rounded-lg border-[1px] border-gray-300 p-2 hover:bg-[#3053c8] hover:text-white"
          >
            Fill with dummy details
          </button>
          <button
            type="submit"
            onClick={() => {
              cancelHandler();
            }}
            className="mx-1 rounded-lg border-[1px] border-gray-300 p-2 hover:bg-[#3053c8] hover:text-white"
          >
            Cancel
          </button>
        </section>
      </form>
    </Modal>
  );
};

export default AddressForm;

import React, { useContext, useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";

import AuthContext from "../Context/auth-context";
import AddressForm from "../Address/AddressForm";
import AddressCard from "../Address/AddressCard";
import { getReq } from "../../API/APICalls";

const Address = () => {
  const [isAddNew, setIsAddNew] = useState(false);
  const authCtx = useContext(AuthContext);
  const [addresses, setAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    getReq("get-addresses")
      .then((data) => {
        setAddresses(data.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [authCtx.token]);

  const editHandler = (id) => {
    setIsEdit(true);
    const aD = addresses.filter((a) => a._id === id);
    setEditAddress(aD[0]);
  };

  return (
    <div className="text-left m-6">
      <h3 className="font-semibold my-6">MY ADDRESSES</h3>
      {addresses.length <= 0 && <p>No Address Found!</p>}
      <section>
        {addresses.map((i) => (
          <AddressCard
            key={i._id}
            i={i}
            editAddress={editHandler}
            setAddresses={setAddresses}
          />
        ))}
      </section>
      <div className=" my-8 ">
        <button
          className="font-semibold"
          onClick={() => {
            setIsAddNew(true);
          }}
        >
          <AddIcon /> ADD NEW ADDRESS
        </button>
      </div>
      {isAddNew && (
        <AddressForm setAddresses={setAddresses} setIsAddNew={setIsAddNew} />
      )}
      {isEdit && (
        <AddressForm
          addresses={addresses}
          setAddresses={setAddresses}
          isEdit={isEdit}
          addressData={editAddress}
          setIsEdit={setIsEdit}
        />
      )}
    </div>
  );
};

export default Address;

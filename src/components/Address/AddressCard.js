import React from "react";
import { deleteReq } from "../../API/APICalls";

const AddressCard = ({ i, editAddress, setAddresses }) => {
  const removeAddress = (id) => {
    deleteReq(`remove-address/${id}`)
      .then((data) => {
        setAddresses(data.data);
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <div className="my-2 text-sm" key={i._id}>
        <p className="font-semibold ">{i.Name}</p>
        <section className="my-2 ">
          {i.AddressLine1}&nbsp;
          {i.City}, {i.State}-{i.Pincode}
          <p>{i.Country}</p>
          <p>Mobile Number: {i.Mobile}</p>
        </section>
        <div className="flex justify-start items-start">
          <div className="">
            <button
              className="text-sm text-white my-2 p-[4px] px-4 border-[0.5px] border-[#0E3EDA] rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
              onClick={() => {
                editAddress(i._id);
              }}
            >
              Edit
            </button>
          </div>
          <div className="ml-4">
            <button
              className="text-sm border-[0.5px] border-black my-2 p-[4px] px-4 rounded-lg  hover:bg-[#3f404353]"
              onClick={() => {
                removeAddress(i._id);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressCard;

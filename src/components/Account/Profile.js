import React, { useEffect, useState } from "react";
import { getReq } from "../../API/APICalls";

const Profile = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    getReq("user/details")
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="text-left m-6">
      {userData && (
        <div>
          <h3 className=" font-semibold">PROFILE DETAILS</h3>
          <div className="my-4 w-full lg:w-2/3">
            <section className="my-2 grid grid-cols-2">
              <p>Full Name :</p>
              <p>
                {userData.firstName} {userData.lastName}
              </p>
            </section>
            <section className="my-2 grid grid-cols-2">
              <p>Email :</p>
              <p>{userData.email}</p>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

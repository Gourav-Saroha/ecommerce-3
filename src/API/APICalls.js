// const base_url = "http://localhost:3000/";
const base_url = "https://ecom-api01.onrender.com/";

//GET
export const getReq = async (url) => {
  return fetch(base_url + url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

//PUT
export const putReq = async (url, payload = {}) => {
  return fetch(base_url + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({ payload }),
  }).then((res) => res.json());
};

//POST
export const postReq = async (url, payload = {}) => {
  return fetch(base_url + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({ payload }),
  }).then((res) => res.json());
};

//DELETE
export const deleteReq = async (url) => {
  return fetch(base_url + url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  }).then((res) => res.json());
};

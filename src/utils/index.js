import axios from "axios";

export const axiosLogin = () => {
  return axios.create({
    baseURL: "https://lambda-devdesk.herokuapp.com",
    headers: {
      Authorization: `Basic ${btoa("devdesk-client:devdesk-secret")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
};

export const axiosWithAuth = () => {
  return axios.create({
    baseURL: "https://lambda-devdesk.herokuapp.com",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

export const getCurrentLoggedInUser = () => {
  return axios.create({
    baseURL: "https://lambda-devdesk.herokuapp.com",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
};

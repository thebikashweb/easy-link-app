import axios from "axios";
import { handleRefreshToken } from "./authServices";

let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

axios.defaults.baseURL = "http://localhost:5001/api/";

axios.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
      config.headers["refresh_token"] = refreshToken || "";
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

//error and response

axios.interceptors.response.use(
  function (response) {
    //any status that lie within 2xx will trigger this
    console.log("success status request", response);
    return response;
  },
  async (error) => {
    //save original request
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest.url.includes("auth/refresh-token")
    ) {
      //this means refresh token route is being called and refresh token is invalid
      //clear everything and show whatever the message needed
      //TODO redirect to logout route
      //TODO clear all the access and refresh token
    } else if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      //call refresh token handler
      await handleRefreshToken();

      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default axios;

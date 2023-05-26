import axios from "axios";

//TODO attach access token from localStorage
let accessToken = localStorage.getItem("accessToken");

export default axios.create({
  baseURL: "http://localhost:5001/api/",
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});

import axios from "axios";
// import { apiPath, apiLocalHost, apiProxyHost } from "../config/ApiConfig";

// const server =
//   process.env.NODE_ENV === "production" ? apiProxyHost : apiLocalHost;
const baseURL = 'https://mastertool-backend.herokuapp.com';

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const instance = axios.create({
  baseURL,
//   timeout: 1000,
  headers: {...baseHeaders},
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;


export default instance;

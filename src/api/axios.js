import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

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

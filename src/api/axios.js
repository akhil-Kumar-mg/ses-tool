import axios from "axios";
const baseURL = process.env.REACT_APP_API_URL;

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImVtYWlsIjoiYWRtaW5Ac2VzLmNvbSIsImV4cCI6MTYyMjQ1MjY2NSwianRpIjoiZjgxMWRhOGUtZDBmOC00YjQ3LTk5MWItNWU5OTJmMTUzOThjIn0.vDj2BMVEg8b4-h_8-UUHJg_VzBcVdUQLWsbn1EfEB10"
};

const instance = axios.create({
  baseURL,
//   timeout: 1000,
  headers: {...baseHeaders},
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;


export default instance;

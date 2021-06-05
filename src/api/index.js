import SessionService from "../services/SessionService";
import axiosInstance from "./axios";

const httpGet = async (url, params = {}) => {
  return createRequest("GET", url, {}, params);
};

const httpPost = async (url, data, params = {}) => {
  return createRequest("POST", url, data, params);
};

const httpPut = async (url, data, params = {}) => {
  return createRequest("PUT", url, data, params);
};

const httpDelete = async (url, data, params = {}) => {
  return createRequest("DELETE", url, data, params);
};

const createRequest = async (method, url, data = {}, params = {}) => {
  let config = {
    url,
    params,
    method,
    data,
  };

  let token = SessionService.getItem("auth_token");
  let requestHeaders = {};

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }
  config["headers"] = {
    ...requestHeaders,
  };

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error && error.response) {
          const status = error.response.status;
          if (status === 401) {
            SessionService.clear();
            window.location.href = "/"
          }
        }
        reject(error);
      });
  });
};

export default { httpGet, httpPost, httpPut, httpDelete };

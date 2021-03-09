import axiosInstance from "./axios";

const httpGet = async (url, params={}) => {
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

const createRequest = async (method, url, data = {}, params= {}) => {
  let config = {
    url,
    params,
    method,
    data
  };

  return new Promise((resolve, reject) => {
    axiosInstance(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error && error.response) {
          const status = error.response.status;
          const errCode =
            error.response.data && error.response.data.error
              ? error.response.data.error.code
              : "";
        }
        reject(error);
      });
  });
};

export default { httpGet, httpPost, httpPut, httpDelete };

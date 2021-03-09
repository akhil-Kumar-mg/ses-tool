import axiosInstance from "./AxiosInstance";

const get = async (url, params) => {
  return createRequest("GET", url, params, null);
};

const post = async (url, params, data) => {
  return createRequest("POST", url, params, data);
};

const put = async (url, params, data) => {
  return createRequest("PUT", url, params, data);
};

const remove = async (url, params, data) => {
  return createRequest("DELETE", url, params, data);
};

const createRequest = async (method, url, params, data) => {
  const requestMethod = method ? method.toUpperCase() : "GET";
  let config = {
    url,
    params,
    method: requestMethod,
  };

  if (requestMethod !== "GET") {
    config.data = data;
  }

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

export default { get, post, put, remove };

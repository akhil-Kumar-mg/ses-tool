import api from "../../../api";

const saveVod = (data) => {
  return api.httpPost("/vod/", data);
};

const getVod  = (forecastId, projectId) => {
  return api.httpGet(`/vod/?forecast=${forecastId}&project=${projectId}`);
};


export {
  saveVod,
  getVod
};

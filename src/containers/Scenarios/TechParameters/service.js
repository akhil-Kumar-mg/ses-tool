import api from "../../../api";

const getTechParameters  = (forecastId, projectId) => {
  return api.httpGet(`/tech/?forecast=${forecastId}&project=${projectId}`);
};

const saveTechParameters = (data) => {
  return api.httpPost("/tech/", data);
};

export {
    saveTechParameters,
    getTechParameters
};

import api from "../../../api";

const getPeriods = (forecastId, projectId) => {
  return api.httpGet(`/period/?forecast=${forecastId}&project=${projectId}`);
};

const savePeriod = (data) => {
  return api.httpPost("/period/bulk_create/", data);
};

const deletePeriod = (id) => {
  return api.httpDelete(`/period/${id}/`);
};

const editPeriod = (data) => {
  return api.httpPost(`/period/bulk_update/`, data);
};

export { getPeriods, savePeriod, deletePeriod, editPeriod };

import api from "../../../api";

const getPeriods = (id) => {
  return api.httpGet(`/period/?forecast=${id}`);
};

const savePeriod = (data) => {
  return api.httpPost("/period/", data);
};

const deletePeriod = (id) => {
  return api.httpDelete(`/period/${id}/`);
};

const editPeriod = (data) => {
  return api.httpPut(`/period/${data.id}/`, data);
};

export { getPeriods, savePeriod, deletePeriod, editPeriod };

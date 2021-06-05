import api from "../../api";

const getProjects = () => {
  return api.httpGet("/project/");
};

const saveProject = (data) => {
  return api.httpPost("/project/", data);
};

const deleteProject = (id) => {
  return api.httpDelete(`/project/${id}/`);
};

const editProject = (data) => {
  return api.httpPut(`/project/${data.id}/`, data);
};

const getForecasts = (id) => {
  return api.httpGet(`/forecast/?project=${id}`);
};

const editForecast = (data, id) => {
  return api.httpPut(`/forecast/${data.id}/?project=${id}`, data);
};

const saveForecast = (data) => {
  return api.httpPost("/forecast/", data);
};

const deleteForecast = (id) => {
  return api.httpDelete(`/forecast/${id}/`)
};

export {
  getProjects,
  saveProject,
  deleteProject,
  editProject,
  getForecasts,
  saveForecast,
  deleteForecast,
  editForecast
};

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

const getForecasts = () => {
  return api.httpGet("/forecast/");
};

const saveForecast = (data) => {
  return api.httpPost("/forecast/", data);
};
export {
  getProjects,
  saveProject,
  deleteProject,
  editProject,
  getForecasts,
  saveForecast,
};

import api from "../../api";

const getProjectConfiguration = (projectId) => {
  return api.httpGet(`/project/${projectId}/get_config/`);
};

const saveProjectConfiguration = (data) => {
  return api.httpPost(`/project/${data.project}/config/`, data);
};

const editSolution = (data, id) => {
  return api.httpPut(`/project_solution/${id}/`, data);
};

const deleteSolution = (id) => {
  return api.httpDelete(`/project_solution/${id}/`);
};

export { saveProjectConfiguration, getProjectConfiguration, editSolution, deleteSolution };

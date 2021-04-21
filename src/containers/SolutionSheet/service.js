import api from "../../api";

const getSolutions = (id) => {
  return api.httpGet(`/project_solution/?project=${id}`);
};

const saveSolution = (data) => {
  return api.httpPost("/project_solution/", data);
};

const editSolution = (data, id) => {
  return api.httpPut(`/project_solution/${id}/`, data);
};

const deleteSolution = (id) => {
  return api.httpDelete(`/project_solution/${id}/`);
};

export { saveSolution, getSolutions, editSolution, deleteSolution };

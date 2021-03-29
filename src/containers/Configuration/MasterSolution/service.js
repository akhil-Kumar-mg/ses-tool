import api from "../../../api";

const getSolutions = () => {
  return api.httpGet("/solution/");
};

const saveSolution = (data) => {
  return api.httpPost("/solution/", data);
};

const editSolution = (data) => {
  return api.httpPut(`/solution/${data.id}`, data);
};

export { saveSolution, getSolutions, editSolution };

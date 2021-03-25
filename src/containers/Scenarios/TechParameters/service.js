import api from "../../../api";

const saveTechParameters = (data) => {
  return api.httpPost("/tech/", data);
};

export {
    saveTechParameters
};

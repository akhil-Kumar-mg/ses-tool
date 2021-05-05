import { data } from "autoprefixer";
import api from "../../../api";

const getPL = (projectId, forecastId) => {
  return api.httpGet(`/project/${projectId}/pnl/?forecast=${forecastId}`);
};

const generatePL = (projectId, data) => {
  return api.httpPost(`/project/${projectId}/create_pnl/?`, data);
};

export { getPL, generatePL };

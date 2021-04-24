import api from "../../../api";

const getPL = (projectId, forecastId) => {
  return api.httpGet(`/project/${projectId}/pnl/?forecastId=${forecastId}`);
};

export { getPL };

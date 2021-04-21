import api from "../../../api";

const getChannelRampUps = (forecastId, projectId) => {
  return api.httpGet(
    `/channel_ramp/?forecast=${forecastId}&project=${projectId}`
  );
};

const editChannelRampUps = (data) => {
  return api.httpPut(
    `/channel_ramp/${data.id}/?forecast=${data.forecast}&project=${data.project}`,
    data
  );
};

export { getChannelRampUps, editChannelRampUps };

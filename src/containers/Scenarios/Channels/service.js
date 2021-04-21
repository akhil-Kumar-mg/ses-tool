import api from "../../../api";

const getChannels = (forecastId, projectId) => {
  return api.httpGet(`/channel/?forecast=${forecastId}&project=${projectId}`);
};

const saveChannel = (data) => {
  return api.httpPost("/channel/", data);
};

const deleteChannel = (id) => {
  return api.httpDelete(`/channel/${id}/`);
};

const editChannel = (data) => {
  return api.httpPut(`/channel/${data.id}/`, data);
};

export { getChannels, saveChannel, deleteChannel, editChannel };

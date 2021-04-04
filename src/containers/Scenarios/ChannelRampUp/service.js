import api from "../../../api";

const getChannelRampUps = (id) => {
  return api.httpGet(`/channel_ramp/?forecast=${id}`);
};


const editChannelRampUps = (data) => {
  return api.httpPut(`/channel_ramp/${data.id}/`, data);
};

export { getChannelRampUps, editChannelRampUps };

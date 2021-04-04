import api from "../../../api";

const getSubscriberRampUps = (id) => {
  return api.httpGet(`/subscriber_ramp/?forecast=${id}`);
};


const editSubscriberRampUps = (data) => {
  return api.httpPut(`/subscriber_ramp/${data.id}/`, data);
};

export { getSubscriberRampUps, editSubscriberRampUps };

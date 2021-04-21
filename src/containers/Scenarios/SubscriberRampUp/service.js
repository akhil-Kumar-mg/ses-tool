import api from "../../../api";

const getSubscriberRampUps = (forecastId, projectId) => {
  return api.httpGet(
    `/subscriber_ramp/?forecast=${forecastId}&project=${projectId}`
  );
};

const editSubscriberRampUps = (data) => {
  return api.httpPut(`/subscriber_ramp/${data.id}/?forecast=${data.forecast}&project=${data.project}`, data);
};

export { getSubscriberRampUps, editSubscriberRampUps };

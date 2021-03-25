import api from "../../../api";

const getSubscribers = () => {
  return api.httpGet("/subscriber/");
};

const saveSubscribers = (data) => {
  return api.httpPost("/subscriber/", data);
};

const deleteSubscribers = (id) => {
  return api.httpDelete(`/subscriber/${id}/`);
};

const editSubscribers = (data) => {
  return api.httpPut(`/subscriber/${data.id}/`, data);
};

export {
  getSubscribers,
  saveSubscribers,
  deleteSubscribers,
  editSubscribers,
};

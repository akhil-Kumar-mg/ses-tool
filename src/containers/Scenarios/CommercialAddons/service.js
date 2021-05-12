import api from "../../../api";

const getCommercialAddons = (forecastId, projectId) => {
  return api.httpGet(
    `/commercial_addon/?forecast=${forecastId}&project=${projectId}`
  );
};

const saveCommercialAddon = (data) => {
  return api.httpPost("/commercial_addon/", data);
};

const deleteCommercialAddon = (id) => {
  return api.httpDelete(`/commercial_addon/${id}/`);
};

const editCommercialAddon = (data) => {
  return api.httpPut(`/commercial_addon/${data.id}/`, data);
};

export {
  getCommercialAddons,
  saveCommercialAddon,
  editCommercialAddon,
  deleteCommercialAddon,
};

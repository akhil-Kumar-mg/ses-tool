import api from "../../../api";

const getVendors = () => {
  return api.httpGet("/vendor/");
};

const saveVendor = (data) => {
  return api.httpPost("/vendor/", data);
};

const deleteVendor = (id) => {
  return api.httpDelete(`/vendor/${id}/`);
};

const editVendor = (data) => {
  return api.httpPut(`/vendor/${data.id}/`, data);
};

export { getVendors, saveVendor, deleteVendor, editVendor };

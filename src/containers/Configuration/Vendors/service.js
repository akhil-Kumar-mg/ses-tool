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

const getVendorDetails = (id) => {
  return api.httpGet(`/vendor/${id}/`);
};

const saveCostItem = (data) => {
  return api.httpPost(`/cost/`, data);
};

const editCostItem = (data) => {
  return api.httpPut(`/cost/${data.id}/`, data);
};

const getCostItem = (id) => {
  return api.httpGet(`/cost/${id}/`);
}

const deleteCostItem = (id) => {
  return api.httpDelete(`/cost/${id}/`);
};

export {
  getVendors,
  saveVendor,
  deleteVendor,
  editVendor,
  getVendorDetails,
  saveCostItem,
  editCostItem,
  deleteCostItem,
  getCostItem
};

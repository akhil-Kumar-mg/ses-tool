import api from "../../api";

const getPricings = (id) => {
  return api.httpGet(`/project_pricing/?project=${id}`);
};

const definePricing = (data) => {
  return api.httpPut(`/project_pricing/${data.id}/`, data);
};

const addPricing = (data) => {
  return api.httpPost(`/project_pricing/`, data);
};

const deletePricing = (id) => {
  return api.httpDelete(`/project_pricing/${id}/`)
}

export { getPricings, definePricing, addPricing, deletePricing };

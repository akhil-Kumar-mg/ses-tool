import api from "../../../api";

const getPricings = () => {
  return api.httpGet("/pricing/");
};

const definePricing = (data) => {
  return api.httpPut(`/pricing/${data.id}/`, data);
};

const addPricing = (data) => {
  return api.httpPost(`/pricing/`, data);
};

const deletePricing = (id) => {
  return api.httpDelete(`/pricing/${id}/`)
}

export { getPricings, definePricing, addPricing, deletePricing };

import api from "../../api";

const getPricings = (id) => {
  return api.httpGet(`/project_pricing/?project=${id}`);
};

const definePricing = (data) => {
  return api.httpPut(`/project_pricing/${data.id}/`, data);
};

export { getPricings, definePricing };

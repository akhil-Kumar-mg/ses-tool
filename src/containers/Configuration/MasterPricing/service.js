import api from "../../../api";

const getPricings = () => {
  return api.httpGet("/pricing/");
};

const definePricing = (data) => {
  return api.httpPut(`/pricing/${data.id}/`, data);
};

export { getPricings, definePricing };

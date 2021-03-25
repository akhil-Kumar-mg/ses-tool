import api from "../../../api";

const saveVod = (data) => {
  return api.httpPost("/vod/", data);
};

export {
  saveVod
};

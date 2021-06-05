import api from "../../api";

const login = (data) => {
  return api.httpPost(`/user/login/`, data);
};


export { login };

import api from "../api";

export const actions = {
  CONFIG_INIT: "config_init",
  CONFIG_COMPLETED: "config_completed",
  CONFIG_ERROR: "config_error",
  SELECTED_PROJECT: "selected_project",
};
export const fetchConfigs = (dispatch) => {
  return async () => {
    dispatch({ type: actions.CONFIG_INIT });
    api
      .httpGet("/constants/")
      .then((res) => {
        dispatch({ type: actions.CONFIG_COMPLETED, payload: res });
      })
      .catch((err) => {
        dispatch({ type: actions.CONFIG_ERROR, payload: err });
      });
  };
};

export const selectedProject = (dispatch) => {
  return async (project) => {
    dispatch({ type: actions.SELECTED_PROJECT, payload: project });
  };
};

import api from "../api";

export const actions = {
  CONFIG_INIT: "config_init",
  CONFIG_COMPLETED: "config_completed",
  CONFIG_ERROR: "config_error",
  SELECTED_PROJECT: "selected_project",
  SHOW_CUSTOM_MODAL: 'show_custom_modal',
  HIDE_CUSTOM_MODAL: 'hide_custom_modal'
};
export const fetchConfigs = (dispatch) => {
  return async () => {
    dispatch({ type: actions.CONFIG_INIT });
    api
      .httpGet("/constant/")
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

export const showCustomModal = dispatch => {
  return async (state, message) => {
    dispatch({ type: actions.SHOW_CUSTOM_MODAL, payload: {state, message} })
  }
}

export const hideCustomModal = dispatch => {
  return async () => {
    dispatch({ type: actions.HIDE_CUSTOM_MODAL})
  }
}

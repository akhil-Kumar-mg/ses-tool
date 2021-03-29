import { actions } from "../actions/App";

export const initialState = {
  frequency: [],
  units: [],
  volumes: [],
  error: null,
  selectedProject: "",
  initLoaded: false
};
export const appReducer = (state, action) => {
  switch (action.type) {
    case actions.CONFIG_INIT:
      window.localStorage.setItem("sidebar", JSON.stringify(!state.sideOpen));
      return {
        ...state,
        ...initialState,
        initLoaded: false
      };
    case actions.CONFIG_COMPLETED:
      return {
        ...state,
        ...action.payload,
        error: null,
        initLoaded: true
      };
    case actions.CONFIG_ERROR:
      return {
        ...state,
        ...initialState,
        error: action.payload,
        initLoaded: false
      };
    case actions.SELECTED_PROJECT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

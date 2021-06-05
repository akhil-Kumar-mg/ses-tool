import createDataContext from "./createDataContext";
import { fetchConfigs, selectedProject, showCustomModal, hideCustomModal  } from "../actions/App";
import { initialState, appReducer } from "../reducers/App";

export const { Context, Provider } = createDataContext(
  appReducer,
  { fetchConfigs, selectedProject, showCustomModal, hideCustomModal  },
  { ...initialState }
);

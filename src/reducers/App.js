import { actions } from '../actions/App';

const defaultValue = JSON.parse(window.localStorage.getItem('sidebar'));
export const initialState = {
    sideOpen: defaultValue == null ? true : defaultValue,
    navOpen: false,
    darkTheme: false,
    breadcrumb: [{_uid: -1, title: '.'}]
}
export const appReducer = (state, action) => {
  switch (action.type) {
    case actions.TOGGLE_SIDE_MENU:
      window.localStorage.setItem('sidebar', JSON.stringify(!state.sideOpen))
      return {
        ...state,
        sideOpen: !state.sideOpen
      }
    case actions.TOGGLE_NAV_MENU:
      return {
        ...state,
        navOpen: !state.navOpen
      }
     case actions.UPDATE_BREADCRUMB:
      return {
        ...state,
        breadcrumb: action.payload
      }
    default:
      return state
  }
}
import createDataContext from './createDataContext'
import { toggleSideMenu, toggleNavMenu, updateBreadcrumb } from '../actions/App'
import { initialState, appReducer } from '../reducers/App'

export const { Context, Provider } = createDataContext(appReducer,
  { toggleSideMenu, toggleNavMenu, updateBreadcrumb },
  { ...initialState }
)
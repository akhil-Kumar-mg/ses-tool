import createDataContext from './createDataContext'
import { fetchConfigs } from '../actions/App'
import { initialState, appReducer } from '../reducers/App'

export const { Context, Provider } = createDataContext(appReducer,
  { fetchConfigs },
  { ...initialState }
)
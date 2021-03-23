import api from '../api';

export const actions ={
    CONFIG_INIT: 'config_init',
    CONFIG_COMPLETED: 'config_completed',
    CONFIG_ERROR: 'config_error'
}
export const fetchConfigs = dispatch => {
  return async () => {
    dispatch({ type: actions.CONFIG_INIT })
    api.httpGet('/config_list/').then(res=>{

      dispatch({ type: actions.CONFIG_COMPLETED, payload: res })
    }).catch(err=> {
      dispatch({ type: actions.CONFIG_ERROR, payload: err })
    })
   
  }
}

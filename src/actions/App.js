export const actions ={
    TOGGLE_SIDE_MENU: 'toggle_side_menu',
    TOGGLE_NAV_MENU: 'toggle_nav_menu',
    UPDATE_BREADCRUMB: 'udpate_breadbrumb'
}
export const toggleSideMenu = dispatch => {
  return async () => {
    dispatch({ type: actions.TOGGLE_SIDE_MENU })
  }
}

export const toggleNavMenu = dispatch => {
  return async () => {
    dispatch({ type: actions.TOGGLE_NAV_MENU })
  }
}

export const updateBreadcrumb = dispatch => {
  return async (breadcrumb) => {
    dispatch({ type: actions.UPDATE_BREADCRUMB, payload: breadcrumb })
  }
}
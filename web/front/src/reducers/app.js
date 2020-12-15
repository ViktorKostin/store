import {
  TOOGLE_SHOW_CART,
  TOOGLE_SHOW_LOGIN,
  TOOGLE_SHOW_SIGNUP,
  TOOGLE_SHOW_ADD_PRODUCT_TO_STORE,
  SET_PAGE,
  SET_PER_PAGE,
  SET_MAX_PAGES,
  FETCH_ROLES,
  PENDING_FALSE,
  PENDING_TRUE,
} from '../actions/types';

const initialState = {
  showCart: false,
  showLogin: false,
  showSignUp: false,
  showAddProductToStore: false,
  page: 1,
  perPage: 6,
  maxPages: 1,
  roles: [],
  pending: false,
};

const app = (state=initialState, action) => {
  switch(action.type) {
    case TOOGLE_SHOW_CART:
      return {
          ...state,
          showCart: !state.showCart
        }
    case TOOGLE_SHOW_LOGIN:
      return {
        ...state,
        showLogin: !state.showLogin
      }
    case TOOGLE_SHOW_SIGNUP:
      return {
        ...state,
        showSignUp: !state.showSignUp
      }
    case TOOGLE_SHOW_ADD_PRODUCT_TO_STORE:
      return {
        ...state,
        showAddProductToStore: !state.showAddProductToStore
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      }
    case SET_PER_PAGE:
      return {
        ...state,
        perPage: action.perPage
      }
    case SET_MAX_PAGES:
      return {
        ...state,
        maxPages: Math.ceil(action.maxPages / state.perPage)
      }
    case FETCH_ROLES:
      return {
        ...state,
        roles: action.roles
      }
    case PENDING_FALSE:
      return {
        ...state,
        pending: false
      }
    case PENDING_TRUE:
      return {
        ...state,
        pending: true
      }
    default:
      return state
  }
};

export default app;

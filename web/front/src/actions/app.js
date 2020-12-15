import { products, auth } from '../services'
import {
  TOOGLE_SHOW_CART,
  TOOGLE_SHOW_LOGIN,
  TOOGLE_SHOW_SIGNUP,
  TOOGLE_SHOW_ADD_PRODUCT_TO_STORE,
  SET_PAGE,
  SET_PER_PAGE,
  SET_MAX_PAGES,
  FETCH_ROLES,
  PENDING_TRUE,
  PENDING_FALSE,
} from './types'

const toogleShowCart = () => ({
  type: TOOGLE_SHOW_CART
})

const toogleShowLogin = () => ({
  type: TOOGLE_SHOW_LOGIN
})

const toogleShowSignUp = () => ({
  type: TOOGLE_SHOW_SIGNUP
})

const toogleShowAddProductToStore = () => ({
  type: TOOGLE_SHOW_ADD_PRODUCT_TO_STORE
})

const setPage = (page) => ({
  type: SET_PAGE,
  page
})

const setPerPage = (perPage) => ({
  type: SET_PER_PAGE,
  perPage
})

const setMaxPages = (maxPages) => ({
  type: SET_MAX_PAGES,
  maxPages
})

const fetchMaxPages = () => {
  return (dispatch) => {
    products.getProductsCount()
      .then(maxPages =>
        dispatch(setMaxPages(maxPages))
    )
  }
}

const fetchRoles = () => {
  return (dispatch) => {
    dispatch(pendingTrue())
    auth.roles()
      .then(roles => {
        dispatch({
          type: FETCH_ROLES,
          roles
        })
        dispatch(pendingFalse())
      })
  }
}

const pendingTrue = () => ({
  type: PENDING_TRUE
})

const pendingFalse = () => ({
  type: PENDING_FALSE
})

const app = {
  toogleShowCart,
  toogleShowLogin,
  toogleShowSignUp,
  toogleShowAddProductToStore,
  setPage,
  setPerPage,
  setMaxPages,
  fetchMaxPages,
  fetchRoles,
}

export default app;

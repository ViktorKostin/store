import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from './types'

const addProductToCart = (productId) => {
  return (dispatch, getState) => {
    const state = getState();
    const product = state.products.filter(product => product._id === productId)[0];
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      product
    })
  }
}

const removeProductFromCart = (id) => ({
  type: REMOVE_PRODUCT_FROM_CART,
  id
})

const cart = {
  addProductToCart,
  removeProductFromCart,
}

export default cart;

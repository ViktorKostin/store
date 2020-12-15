import {
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from '../actions/types';

let id = 0;

const cart = (state=[], action) => {
  switch(action.type) {
    case ADD_PRODUCT_TO_CART:
      return [
        ...state,
        {
          id: id++,
          ...action.product,
          sizes: action.product.sizes.filter(size => size.active).map(size => size.value),
        }
      ]
    case REMOVE_PRODUCT_FROM_CART:
      return state.filter(product => product.id !== action.id)
    default:
      return state
  }
};

export default cart;

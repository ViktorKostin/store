import {
  FETCH_DATA_PRODUCTS,
  ADD_PRODUCT_TO_REACT,
  REMOVE_PRODUCT_FROM_REACT,
  TOOGLE_SIZE,
} from "../actions/types";

const products = (state=[], action) => {
  switch(action.type){
    case FETCH_DATA_PRODUCTS:
      state = action.products.map(product => {
        return {
          ...product,
          sizes: product.sizes.map(size => {
            return {value: size, active: false}
          })
        }
      })
      return state
    case ADD_PRODUCT_TO_REACT:
      return [
        {
          ...action.product,
          sizes: action.product.sizes.map(size => {
            return {value: size, active: false}
          })
        },
        ...state
      ]
    case REMOVE_PRODUCT_FROM_REACT:
      return state.filter(product => product._id !== action.productId)
    case TOOGLE_SIZE:
      return [
        ...state.map(product =>
          product._id === action.productId ? 
            {...product, sizes: product.sizes.map(size => size.value === action.value ?
              {...size, active: !size.active} : 
              size
            )} :
            product
        )
      ]
    default:
      return state
  }
};

export default products;

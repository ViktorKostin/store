import { products as productsService } from '../services'
import {
  REMOVE_PRODUCT_FROM_REACT,
  ADD_PRODUCT_TO_REACT,
  FETCH_DATA_PRODUCTS,
  TOOGLE_SIZE,
} from './types'

const removeProductFromStore = (productId) => {
  return (dispatch) => {
    productsService.removeProduct(productId)
      .then(res => dispatch(removeProductFromReact(productId)))
  }
}

const removeProductFromReact = (productId) => ({
  type: REMOVE_PRODUCT_FROM_REACT,
  productId
})

const addProductToStore = (formData) => {
  return (dispatch) => {
    productsService.addProduct(formData)
      .then(product => dispatch(addProductToReact(product)))
  }
}

const addProductToReact = (product) => ({
  type: ADD_PRODUCT_TO_REACT,
  product
})

const fetchDataProducts = (products) => ({
  type: FETCH_DATA_PRODUCTS,
  products
})

const fetchProducts = (page, perPage) => {
  return (dispatch) => {
    productsService.getProducts(page, perPage)
      .then(products => dispatch(fetchDataProducts(products)))
  }
}

const toogleSize = (productId, value) => ({
  type: TOOGLE_SIZE,
  productId,
  value
})

const products = {
  removeProductFromStore,
  removeProductFromReact,
  addProductToStore,
  addProductToReact,
  fetchDataProducts,
  fetchProducts,
  toogleSize,
}

export default products;

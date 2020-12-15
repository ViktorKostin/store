import axios from 'axios'
import authHeader from './authHeader'

const URL = '/products/'

const getProducts = (page, perPage) => {
  return axios.get(URL + `page/${page}/perPage/${perPage}/`)
    .then(res => res.data)
}
const getProductsCount = () => {
  return axios.get(URL + 'count')
    .then(res => res.data)
}
const removeProduct = (productId) => {
  return axios.delete(URL + `delete/${productId}`, {headers: authHeader()})
}
const addProduct = (formData) => {
  return axios({
      method: 'post',
      url: URL,
      data: formData,
      headers: {...authHeader(), 'Content-Type': 'multipart/form-data'}
  })
    .then(res => res.data)
}

const products = {
  getProducts,
  removeProduct,
  addProduct,
  getProductsCount,
}

export default products;
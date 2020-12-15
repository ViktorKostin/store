import { createSelector } from 'reselect';

const getProducts = (state) => state.products;
const getSizesWithState = (state, props) => state.products.filter(product => product._id === props.productId)[0].sizes;

const makeProducts = () => {
  return createSelector(
    getProducts,
    products => products
  );
};
const makeGetSizesWithState = () => {
  return createSelector(
    getSizesWithState,
    (sizes) => sizes
  );
};

const products = {
  makeProducts,
  makeGetSizesWithState
};

export default products;

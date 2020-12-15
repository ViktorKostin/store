import { createSelector } from 'reselect';

const cartProducts = (state) => state.cart;

const makeCartProducts = () => {
  return createSelector(
    cartProducts,
    products => products
  );
};
const makeCartProductsCount = () => {
  return createSelector(
    cartProducts,
    products => products.length
  );
};

const cart = {
  makeCartProducts,
  makeCartProductsCount,
};

export default cart;

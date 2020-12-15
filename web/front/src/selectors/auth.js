import { createSelector } from 'reselect';

const getIsLogged = (state) => state.auth.isLogged;
const getUser = (state) => state.auth.user;
const getRoles = (state) => state.auth.roles;

const makeIsLogged = () => {
  return createSelector(
    getIsLogged,
    isLogged => isLogged
  );
};
const makeIsAdmin = () => {
  return createSelector(
    getRoles,
    roles => roles.includes('admin')
  );
};
const makeUser = () => {
  return createSelector(
    getUser,
    user => user
  );
};
const makeRoles = () => {
  return createSelector(
    getRoles,
    roles => roles
  );
};

const auth = {
  makeIsLogged,
  makeIsAdmin,
  makeUser,
  makeRoles,
};

export default auth;

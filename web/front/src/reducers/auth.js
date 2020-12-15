import {
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLogged: true, user, roles: user.roles }
  : { isLogged: false, user: null, roles: [] };

const auth = (state=initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLogged: true,
        user: action.user,
        roles: action.user.roles
      };
    case LOGOUT:
      return {
        isLogged: false,
        user: null,
        roles: []
      };
    default:
      return state;
  }
};

export default auth;

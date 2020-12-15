import {
  ADD_USER,
  SET_RECIEVER,
  REMOVE_USER,
  SET_MESSAGE_READED,
  SET_MESSAGE_NOT_READED,
} from '../actions/types';

const nextTodoId = (state) => {
  const maxId = Object.keys(state.users).reduce((maxId, user) => Math.max(state.users[user].id, maxId), 0);
  return maxId + 1;
};

const initialState = {
  users: {}
};

const chat = (state=initialState, action) => {
  switch(action.type) {
    case ADD_USER:
      if(action.user.name.includes('Guest ')) {
        action.user.name += nextTodoId(state);
      }
      action.user.id = nextTodoId(state);
      return {
        ...state,
        users: {...state.users, [action.user.uid] : {...action.user}}
      }
    case SET_RECIEVER:
      return {
        ...state,
        reciever: action.reciever
      }
    case REMOVE_USER:
      const {[action.userId]: deletedUser, ...users} = state.users;
      return {
        ...state,
        users: {...users}
      }
    case SET_MESSAGE_READED:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user] : {...state.users[action.user], readed : true}
        }
      }
    case SET_MESSAGE_NOT_READED:
      return {
        ...state,
        users: {
          ...state.users,
          [action.user] : {...state.users[action.user], readed : false}
        }
      }
    default:
      return state
  }
};

export default chat;

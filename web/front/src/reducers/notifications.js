import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION
} from "../actions/types";

let nextId = 1;

const notifications = (state=[], action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        {
          id: nextId++,
          level: action.level,
          title: action.title,
          message: action.message
        }
      ]
    case REMOVE_NOTIFICATION:
      return state.filter(message => message.id !== action.id)
    default:
      return state;
  }
};

export default notifications;

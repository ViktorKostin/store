import {
  ADD_USER,
  SET_RECIEVER,
  REMOVE_USER,
  SET_MESSAGE_READED,
  SET_MESSAGE_NOT_READED,
} from './types'

const addUser = (user) => {
  return (dispatch, getState) => {
    if(typeof(user) === 'object'){
      user = {
        ...user,
        readed: true,
      }
    }
    if(typeof(user) === 'string'){
      user = {
        name: 'Guest ',
        uid: user,
        readed: true,
      }
    }
    dispatch({
      type: ADD_USER,
      user
    })
  }
}

const setReciever = (reciever) => ({
  type: SET_RECIEVER,
  reciever
})

const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId
})

const setMessageReaded = (user) => ({
  type: SET_MESSAGE_READED,
  user
})

const setMessageNotReaded = (user) => ({
  type: SET_MESSAGE_NOT_READED,
  user
})

const chat = {
  addUser,
  setReciever,
  removeUser,
  setMessageReaded,
  setMessageNotReaded,
}

export default chat;

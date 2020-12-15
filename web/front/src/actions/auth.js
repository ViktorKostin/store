import { auth as authService } from '../services'
import { notifications, app } from './'
import {
  LOGIN_SUCCESS,
  LOGOUT,
} from './types'

const login = (email, password, fromSignUp=false) => {
  return (dispatch) => {
    authService.login(email, password)
      .then(user => {
        dispatch({
          type: LOGIN_SUCCESS,
          user: user,
          roles: user.roles
        })
        dispatch(notifications.addNotification('success', 'Success', 'Logged'))
        if(!fromSignUp)
          dispatch(app.toogleShowLogin())
      })
      .catch(error =>
        dispatch(notifications.addNotification('error', 'Error', error.response.data.message))
      )
  }
}

const logout = () => {
  return (dispatch) => {
    authService.logout()
    dispatch({
      type: LOGOUT
    })
    dispatch(notifications.addNotification('success', 'Success', 'Logout'))
  }
}

const signUp = (email, password, roles) => {
  return (dispatch) => {
    authService.signup(email, password, roles)
      .then(user => {
        dispatch(notifications.addNotification('success', 'Success', 'User created'))
        dispatch(login(email, password, true))
        dispatch(app.toogleShowSignUp())
      })
      .catch(error =>
        dispatch(notifications.addNotification('error', 'Error', error.response.data.message))
      )
  }
}

const auth = {
  login,
  logout,
  signUp,
}

export default auth;

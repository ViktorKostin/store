import { REMOVE_NOTIFICATION, ADD_NOTIFICATION } from './types'

const removeNotification = (id) => ({
  type: REMOVE_NOTIFICATION,
  id
})

const addNotification = (level, title, message) => ({
  type: ADD_NOTIFICATION,
  level,
  title,
  message
})

const notifications = {
  removeNotification,
  addNotification,
}

export default notifications;

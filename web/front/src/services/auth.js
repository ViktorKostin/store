import axios from 'axios'

const URL = '/auth/'

const signup = (email, password, roles) => {
  const rolesToArray = (roles) => {
    let result = [];
    for(let role in roles) {
      if(roles[role])
        result.push(role)
    }
    return result;
  }
  
  return axios.post(URL + 'signup', {
    email,
    password,
    roles: rolesToArray(roles),
  })
    .then(res => {
      if(res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }

      return res.data
    })
}

const login = (email, password) => {
  return axios.post(URL + 'signin', {
    email,
    password
  })
    .then(res => {
      if(res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data))
      }

      return res.data
    })
}

const logout = () => {
  localStorage.removeItem('user')
}

const roles = () => {
  return axios.get(URL + 'roles')
    .then(res => res.data.roles)
}

const auth = {
  signup,
  login,
  logout,
  roles,
}

export default auth;
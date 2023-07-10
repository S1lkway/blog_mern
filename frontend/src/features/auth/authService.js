//* Requests for data to backend *//

import axios from 'axios'

const API_URL = 'api/users/'

//TODO Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//TODO Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//TODO Edit user
const edit = async (userData, token) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + 'edit', userData, config)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//TODO Logout user
const logout = () => {
  localStorage.removeItem('user')
}


const authService = {
  register,
  logout,
  login,
  edit
}

export default authService
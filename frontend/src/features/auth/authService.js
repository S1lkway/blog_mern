import axios from 'axios'

const API_URL = 'api/users/'

//* REGISTER USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//* LOGIN USER
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

//* EDIT USER
const edit = async (userData, token) => {
  /// Put token to config before 
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

//* LOGOUT USER
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
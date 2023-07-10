import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

//TODO Get user from localStotage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//TODO Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//TODO Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//TODO Edit user
export const edit = createAsyncThunk(
  'auth/edit',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.edit(user, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

//TODO Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})


//TODO AUTHSLICE //
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      //* REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      //user data comes from 'try' from 'const register'
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      //message data comes from 'const register' from 'return thunkAPI.rejectWithValue(message)' in 'catch' block
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      //* LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      //* EDIT
      .addCase(edit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
        state.message = 'aaa'
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = user
      })
      //* LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })

  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
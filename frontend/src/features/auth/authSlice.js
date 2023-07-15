import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

/// Get user from localStotage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

//* REGISTER USER
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await authService.register(user)
  } catch (error) {
    const message = (
      error.response &&
      error.response.data &&
      error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//* LOGIN USER
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//* EDIT USER
export const edit = createAsyncThunk(
  'auth/edit',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await authService.edit(user, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  })

//* LOGOUT USER
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})


//* AUTHSLICE 
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
      /// Register
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
      /// Login
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
      /// Edit
      .addCase(edit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(edit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(edit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = user
      })
      /// Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })

  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
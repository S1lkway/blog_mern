import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import newsService from './newsService'

const initialState = {
  news: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//* GET ALL NEWS
export const getNews = createAsyncThunk(
  'news',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.getNews(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//* NEWS SLICE
export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    resetNews: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /// getNews
      .addCase(getNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.news = action.payload
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})


export const { resetNews } = newsSlice.actions
export default newsSlice.reducer
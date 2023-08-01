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

//* LIKE NEWS
export const likeNews = createAsyncThunk(
  'news/like',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.likeNews(id, token)
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
      /// likeNews
      .addCase(likeNews.pending, (state) => {
        state.isLoading = true
      })
      .addCase(likeNews.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Find index of element with the same _id
        const index = state.news.findIndex((item) => item._id === action.payload._id);
        // If index was found we change that element by new one from action
        if (index !== -1) {
          state.news[index] = action.payload;
        }
      })
      .addCase(likeNews.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})


export const { resetNews } = newsSlice.actions
export default newsSlice.reducer
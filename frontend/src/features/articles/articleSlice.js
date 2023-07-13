import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import articleService from './articleService'

const initialState = {
  articles: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//* CREATE NEW ARTICLE
export const createArticle = createAsyncThunk(
  'articles/create',
  async (articleData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.createArticle(articleData, token)
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

//* GET USER ARTICLES
// Get user articles
export const getArticles = createAsyncThunk(
  'articles/userArticles',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.getArticles(token)
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

//* DELETE USER ARTICLE
export const deleteArticle = createAsyncThunk(
  'articles/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await articleService.deleteArticle(id, token)
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


//* ARTICLESLICE
export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      /// createArticles
      .addCase(createArticle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles.push(action.payload)
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      /// getArticles
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = action.payload
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      /// deleteArticle
      .addCase(deleteArticle.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.articles = state.articles.filter(
          (article) => article._id !== action.payload.id
        )
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = articleSlice.actions
export default articleSlice.reducer
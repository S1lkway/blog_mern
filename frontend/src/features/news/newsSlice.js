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

//* ADD COMMENT
export const addComment = createAsyncThunk(
  'news/comment',
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.addComment(commentData, token)
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

//* DELETE COMMENT
export const deleteComment = createAsyncThunk(
  'news/comment/delete',
  async (commentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await newsService.deleteComment(commentData, token)
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
      /// addComment
      .addCase(addComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Find index of element with the same _id
        const newsIndex = state.news.findIndex((item) => item._id === action.payload.article);
        // If newsIndex is valid
        if (newsIndex !== -1) {
          // Use map to update the comments array
          state.news = state.news.map((newsItem) => {
            // If the news item is the one we are looking for
            if (newsItem._id === action.payload.article) {
              // Update the comments array
              return {
                ...newsItem,
                comments: [action.payload, ...newsItem.comments],
              };
            } else {
              // Leave the news item unchanged
              return newsItem;
            }
          });
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      /// deleteComment
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Get ids and search for newsIndex to change
        const { id, commentId } = action.payload;
        const newsIndex = state.news.findIndex((item) => item._id === id);
        // If news was found, delete the comment
        if (newsIndex !== -1) {
          state.news[newsIndex].comments = state.news[newsIndex].comments.filter(
            (comment) => comment._id !== commentId
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})


export const { resetNews } = newsSlice.actions
export default newsSlice.reducer
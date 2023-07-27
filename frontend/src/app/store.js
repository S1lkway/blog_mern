import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import articleReducer from '../features/articles/articleSlice'
import newsReducer from '../features/news/newsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
    news: newsReducer,
  },
});

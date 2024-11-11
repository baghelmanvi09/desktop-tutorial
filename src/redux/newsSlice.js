import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk to fetch news data
export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://hn.algolia.com/api/v1/search', {
        params: { query, page },
      });
      return response.data;
    } catch (error) {
      // Catch error and return a rejected action with a message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    status: 'idle',
    error: null,
    currentPage: 1,
    totalPages: 0,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.hits;
        state.totalPages = action.payload.nbPages;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setPage } = newsSlice.actions;

export default newsSlice.reducer;

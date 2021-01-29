import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import getArticles from '../../api/getArticles';
import createArticle from '../../api/createArticle';
import updateArticle from '../../api/updateArticle';
import deleteArticle from '../../api/deleteArticle';
import likeArticle from '../../api/like';

import {
  GET_ARTICLES,
  SET_PAGE, SET_VIEW_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  LIKE_ARTICLE,
} from '../../const/reducers';

export const getArticlesThunk = createAsyncThunk(GET_ARTICLES, async (page) => {
  const data = await getArticles(page);
  return data;
});

export const createArticleThunk = createAsyncThunk(CREATE_ARTICLE, async (article) => {
  const data = await createArticle(article);
  return data;
});

export const updateArticleThunk = createAsyncThunk(UPDATE_ARTICLE, async (parameters) => {
  console.log(parameters.slug);
  const data = await updateArticle(parameters);
  return data;
});

export const deleteArticleThunk = createAsyncThunk(DELETE_ARTICLE, async (slug) => {
  const res = await deleteArticle(slug);
  return res;
});

export const likeArticleThunk = createAsyncThunk(LIKE_ARTICLE, async (slug) => {
  const res = await likeArticle(slug);
  return res;
});

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    page: 1,
    totalPages: null,
    isLoading: false,
    articles: [],
    viewArticle: null,
    errors: null,
  },
  reducers: {
    [SET_PAGE]: (state, action) => {
      state.page = action.payload.page;
    },
    [SET_VIEW_ARTICLE]: (state, action) => {
      state.viewArticle = action.payload;
    },
  },
  extraReducers: {
    [getArticlesThunk.pending]: (state) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    },
    [getArticlesThunk.fulfilled]: (state, action) => {
      if (state.isLoading) {
        state.articles = action.payload.articles;
        state.totalPages = action.payload.articlesCount;
        state.isLoading = false;
        // console.log(state.articles);
      }
    },
    [getArticlesThunk.rejected]: (state, action) => {
      console.warn(action.error);
      state.isLoading = false;
    },
    [createArticleThunk.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        state.errors = action.payload;
      } else {
        state.errors = null;
      }
    },
    [createArticleThunk.rejected]: (state, action) => {
      console.warn(action.error);
      state.errors = action.payload;
    },
    [updateArticleThunk.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        console.log(action);
        state.errors = action.payload;
      } else {
        state.errors = null;
      }
    },
    [updateArticleThunk.rejected]: (state, action) => {
      console.warn(action.error);
      state.errors = action.payload;
    },
    [deleteArticleThunk.fulfilled]: (state, action) => {
      if (action.payload.errors) {
        console.log(action);
        state.errors = action.payload;
      } else {
        state.viewArticle = null;
        state.errors = null;
      }
      state.isLoading = false;
    },
    [deleteArticleThunk.rejected]: (state, action) => {
      console.warn(action.error);
      state.errors = action.payload;
    },
    [likeArticleThunk.fulfilled]: (state, action) => {
      const stateCopy = JSON.parse(JSON.stringify(current(state.articles)));
      const articleIndex = stateCopy.findIndex(
        (e) => e.slug === action.payload.article.slug,
      );
      if (!stateCopy[articleIndex].favorited) {
        stateCopy[articleIndex].favoritesCount += 1;
      }
      stateCopy[articleIndex].favorited = true;
      state.articles = stateCopy;
    },
  },
});

export const { setPage, setViewArticle } = dataSlice.actions;

export default dataSlice.reducer;

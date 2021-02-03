import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authAPI from 'api/Auth';
import { deleteCookie } from '../../util/deleteCookie';
import {
  REGISTRATION, LOG_IN, GET_USER, CLEAR_AUTH_ERRORS, LOG_OUT, UPDATE_USER,
} from '../../const/reducers';

export const registrationThunk = createAsyncThunk(REGISTRATION, async (user) => {
  const authUserStatus = await authAPI.registration(user);
  return authUserStatus;
});

export const loginThunk = createAsyncThunk(LOG_IN, async (user) => {
  const authUserStatus = await authAPI.login(user);
  return authUserStatus;
});

export const getUserThunk = createAsyncThunk(GET_USER, async () => {
  const authUserStatus = await authAPI.getUser();
  return authUserStatus;
});

export const updateUserThunk = createAsyncThunk(UPDATE_USER, async (newUser) => {
  const authUserStatus = await authAPI.updateUser(newUser);
  return authUserStatus;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoading: false,
    errors: null,
  },
  reducers: {
    [CLEAR_AUTH_ERRORS]: (state) => {
      state.errors = null;
    },
    [LOG_OUT]: (state) => {
      deleteCookie('Token');
      state.currentUser = null;
    },
  },
  extraReducers: {
    [registrationThunk.pending]: (state) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    },
    [registrationThunk.fulfilled]: (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        if (!action.payload.errors) {
          document.cookie = `Token=${action.payload.user.token}`;
          state.currentUser = action.payload;
          state.errors = null;
        } else {
          state.errors = action.payload;
        }
      }
    },
    [registrationThunk.rejected]: (state, action) => {
      if (state.isLoading) {
        console.warn(action.error);
        state.isLoading = false;
        state.errors = action.payload;
      }
    },
    [loginThunk.pending]: (state) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    },
    [loginThunk.fulfilled]: (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        if (!action.payload.errors) {
          document.cookie = `Token=${action.payload.user.token}`;
          state.currentUser = action.payload.user;
          state.errors = null;
        } else {
          state.errors = action.payload;
        }
      }
    },
    [loginThunk.rejected]: (state, action) => {
      if (state.isLoading) {
        console.warn(action.error);
        state.isLoading = false;
        state.errors = action.payload;
      }
    },
    [getUserThunk.pending]: (state) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    },
    [getUserThunk.fulfilled]: (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        if (!action.payload.errors) {
          state.currentUser = action.payload.user;
          state.errors = null;
        } else {
          state.errors = action.payload;
        }
      }
    },
    [getUserThunk.rejected]: (state, action) => {
      if (state.isLoading) {
        console.warn(action.error);
        state.isLoading = false;
        state.errors = action.payload;
      }
    },
    [updateUserThunk.pending]: (state) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    },
    [updateUserThunk.fulfilled]: (state, action) => {
      if (state.isLoading) {
        state.isLoading = false;
        if (!action.payload.errors) {
          const fields = Object.keys(action.payload.user);
          const obj = fields.reduce((current, field) => {
            if (action.payload.user[field] !== undefined) {
              // console.log(`${field} - ${action.payload.user[field]}`);
              current[`${field}`] = action.payload.user[field];
            }
            return current;
          }, state.currentUser);
          state.currentUser = obj;
          state.errors = null;
        } else {
          state.errors = action.payload;
        }
      }
    },
    [updateUserThunk.rejected]: (state, action) => {
      if (state.isLoading) {
        console.warn(action.error);
        state.isLoading = false;
      }
    },
  },
});

export const { clearAuthErrors, logOut } = authSlice.actions;

export default authSlice.reducer;

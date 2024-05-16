import { configureStore } from "@reduxjs/toolkit";

import userSessionReducer from "./reducer/session";
import paginationReducer from "./reducer/userPagination";
import userListSlice from "./reducer/userListSlice";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    userSession: userSessionReducer,
    pagination: paginationReducer,
    userList: userListSlice,
  },
});

export const { dispatch, getState } = store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

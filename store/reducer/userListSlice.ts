// userListSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  showEmail: boolean;
  avatar: string;
}

interface UserListState {
  users: User[];
  currentPage: number;
  isLoading: boolean;
  total_pages: number;
  total: number;
  per_page: number;
  page: number;
}

const initialState: UserListState = {
  users: [],
  currentPage: 1,
  isLoading: false,
  total_pages: 0,
  total: 0,
  per_page: 10,
  page: 0,
};

const userListSlice = createSlice({
  name: "userList",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload.map((user) => ({
        ...user,
        showEmail: false,
      }));
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<number>) => {
      state.total_pages = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleShowEmail: (state, action: PayloadAction<{ userId: number }>) => {
      const userToToggle = state.users.find(
        (user) => user.id === action.payload.userId,
      );
      if (userToToggle) {
        userToToggle.showEmail = !userToToggle.showEmail;
      }
    },
  },
});

export const {
  setUsers,
  setCurrentPage,
  setIsLoading,
  toggleShowEmail,
  setTotalPage,
} = userListSlice.actions;

export const selectUsers = (state: RootState) => state.userList.users;
export const selectCurrentPage = (state: RootState) =>
  state.userList.currentPage;

export default userListSlice.reducer;

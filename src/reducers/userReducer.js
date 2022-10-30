import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  currentUser: {},
};

export const userReducer = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { updateAllUsers, updateCurrentUser } = userReducer.actions;

export default userReducer.reducer;

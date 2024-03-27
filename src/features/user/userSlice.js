import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updatedProfile: null,
  allUsers: null,
  numberOfUsers: 0,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedUser = action.payload;
      state.updatedProfile = updatedUser;
    },

    getUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedUser = action.payload;
    },

    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { users, count } = action.payload;
      state.allUsers = users;
      state.numberOfUsers = count;
    }
  },
});

export default slice.reducer;

export const updateUserProfile =
  ({
    _id,
    username,
    address,
    phone
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        username,
        address,
        phone,
      };
      
      const response = await apiService.put(`/user/me`, data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getUsers = ({page, limit, filter}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/admin/users', { params: {page, limit, filter} });
    console.log("getUsers", response);
    dispatch(slice.actions.getAllUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};
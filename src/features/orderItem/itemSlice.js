import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updatedItem: null,
  selectedItem: null,
  items: null,
};

const slice = createSlice({
  name: "item",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateItemSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedItem = action.payload.item;
      state.updatedItem = updatedItem;
    },

    getItemSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedItem = action.payload;
    },

    getAllItemsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    
      state.items = action.payload.orderItems;
    },
  },
});

export default slice.reducer;

export const updateItem =
  ({
    _id,
    itemid,
    change,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        change,
      };
      
      const response = await apiService.patch(`/orders/${_id}/item/${itemid}`, data);
      dispatch(slice.actions.updateItemSuccess(response.data));
      toast.success("Update Item successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getAllItems = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/orders/${id}`);
    dispatch(slice.actions.getAllItemsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
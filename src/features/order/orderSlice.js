import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";

const initialState = {
  isLoading: false,
  error: null,
  updatedOrder: null,
  selectedOrder: null,
  pendingOrder: null,
  completedOrders: null,
  numberOfOrders: 0,
  allOrders: null,
};

const slice = createSlice({
  name: "order",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    updateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const updatedOrder = action.payload;
      state.updatedOrder = updatedOrder;
    },

    getOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.selectedOrder = action.payload;
    },

    getPendingOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.pendingOrder = action.payload.pendingOrder;
    },

    getCompletedOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
    
      state.completedOrders = action.payload.completedOrders;

      state.numberOfOrders = action.payload.completedOrders.length;
    },

    getAllOrdersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const { orders, count } = action.payload;
      state.allOrders = orders;
      state.numberOfOrders = count;
    },
  },
});

export default slice.reducer;

export const updateOrder =
  ({
    _id,
    status,
    price,
    paymentMethod,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        status,
        price,
        paymentMethod,
      };
      
      const response = await apiService.patch(`/orders/${_id}`, data);
      dispatch(slice.actions.updateOrderSuccess(response.data));
      toast.success("Update Order successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const getPendingOrder= () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/orders/me/pending`);
    dispatch(slice.actions.getPendingOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getCompletedOrders = (filter) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/orders/me/completed', { params: filter });
    dispatch(slice.actions.getCompletedOrdersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getOrder = (id) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/orders/${id}`);
    console.log(id);
    dispatch(slice.actions.getOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllOrders = ({page, limit}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/admin/orders', { params: {page, limit} });
    console.log("getAllOrders", response);
    dispatch(slice.actions.getAllOrdersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};
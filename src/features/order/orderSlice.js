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
  numberOfItemsInPending: 0,
  pendingItems: null,
  allOrders: null,
  statusChange: null,
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
      state.numberOfOrders = state.numberOfOrders + 1;
      state.numberOfItemsInPending = 0;
      state.pendingOrder = null;
      state.pendingItems = null;
    },

    adminUpdateOrderSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      const status = action.payload.order.status;
      state.statusChange = status;
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
      state.pendingItems = action.payload.orderItems;
      state.numberOfItemsInPending = action.payload.numberOfItems;
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

    addCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;

      state.pendingOrder = action.payload.order;
      state.numberOfItemsInPending = action.payload.numItems;
    },
  },
});

export default slice.reducer;

export const updateOrder =
  ({
    id,
    status,
    address,
    paymentMethod,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        status,
        address,
        paymentMethod,
      };
      
      const response = await apiService.patch(`/orders/${id}`, data);
      dispatch(slice.actions.updateOrderSuccess(response.data.data));
      toast.success("Submit Payment successfully");
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
    dispatch(slice.actions.getOrderSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getAllOrders = ({page, limit}) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get('/admin/orders', { params: {page, limit} });
    dispatch(slice.actions.getAllOrdersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const addCart = (product) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.post('/orders/addCart', product);
    dispatch(slice.actions.addCartSuccess(response.data.data));
    toast.success("Add to cart successfully");
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error("Add to cart failed");
  }
};

export const adminUpdateOrder =
  ({
    id,
    status,
    address,
    paymentMethod,
  }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        status,
        address,
        paymentMethod,
      };
      
      const response = await apiService.patch(`/orders/${id}`, data);
      dispatch(slice.actions.adminUpdateOrderSuccess(response.data.data));
      toast.success("Update Order successfully");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };
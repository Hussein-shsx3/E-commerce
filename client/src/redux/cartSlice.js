import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.totalAmount += action.payload.price;
      state.status = "succeeded";
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (existingItem.quantity === 1) {
        state.items = state.items.filter(
          (item) =>
            !(
              item.id === action.payload.id && item.size === action.payload.size
            )
        );
      } else {
        existingItem.quantity -= 1;
      }

      state.totalAmount -= action.payload.price;
      state.status = "succeeded";
    },
  },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;

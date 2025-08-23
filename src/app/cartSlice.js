import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.id === item.id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    incrementQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((x) =>
        x.id === action.payload ? { ...x, quantity: x.quantity + 1 } : x
      );
    },
    decrementQuantity: (state, action) => {
      state.cartItems = state.cartItems.map((x) =>
        x.id === action.payload && x.quantity > 1 ? { ...x, quantity: x.quantity - 1 } : x
      );
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

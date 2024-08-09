import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
 
  totalAmount: 0,
  
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      const newItem = { ...action.payload, userQuantity: 1,userAmont: action.payload.price };
      const existedItemIndex = state.items.findIndex(item => item._id === action.payload._id);
    
      if (existedItemIndex !== -1) {
        const existedItem = state.items[existedItemIndex];
        
        if (existedItem._id === action.payload.id) {
          existedItem.userQuantity += 1;
          existedItem.userAmont += newItem.price;
          state.totalAmount += newItem.price;
          state.totalCount += 1;
        } else {
          state.items.push(newItem);
          state.totalAmount += newItem.price;
          state.totalCount += 1;
        }
      } else {
        state.items.push(newItem);
        state.totalAmount += newItem.price;
        state.totalCount += 1;
      }
    },
    
    incrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload.id);
      console.log(itemIndex);
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        item.userQuantity += 1;
        item.userAmont += item.price;
        state.totalAmount += item.price;
        state.totalCount += 1;
        console.log(item.userQuantity);
        
      }
    },
    decrementQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload.id);
      if (itemIndex >= 0) {
        const item = state.items[itemIndex];
        if (item.userQuantity > 1) {
          item.userQuantity -= 1;
          item.userAmont -= item.price;
          state.totalAmount -= item.price;
          state.totalCount -= 1;
          console.log(item.userQuantity);
        }
      }
    },
    RemoveItem: (state, action) => {
      const itemIndex = state.items.findIndex(item => item._id === action.payload.id);
      
      if (itemIndex >= 0) {
        const item = state.items[itemIndex]
        item.userAmont -= item.price * item.userQuantity;
        state.totalCount -= item.userQuantity;
        state.totalAmount -= item.price ;
        state.items.splice(itemIndex, 1);
      }
    },

    TotalAmountHandle:(state,action) =>{
      state.totalAmount = 0;
    }
  }
});

export const { AddToCart, incrementQuantity, decrementQuantity, RemoveItem,TotalAmountHandle } = cartSlice.actions;

export default cartSlice.reducer;
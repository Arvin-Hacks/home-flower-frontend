import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/product.Slice';
import productRequestReducer from '../features/requests/requestsSlice';
import messageSliceReducer from '../features/requests/messagesSlice';
import cartReducer from '../features/cart/cartSlice';
import orderReducer from '../features/order/OrderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    productReducer:productReducer,
    productRequestReducer:productRequestReducer,
    messageSliceReducer:messageSliceReducer,
    cartReducer:cartReducer,
    orderReducer:orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

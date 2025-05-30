import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import cartReducer from './reducers/cart'
import modalReducer from './reducers/modal'
import orderReducer from './reducers/order'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    order: orderReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

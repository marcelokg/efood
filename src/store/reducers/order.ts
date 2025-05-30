import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CheckoutPayload } from '../../services/api'

interface OrderState {
  deliveryData: CheckoutPayload['delivery'] | null
  paymentData: CheckoutPayload['payment'] | null
}

const initialState: OrderState = {
  deliveryData: null,
  paymentData: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setDeliveryData: (state, action: PayloadAction<CheckoutPayload['delivery']>) => {
      state.deliveryData = action.payload
    },
    setPaymentData: (state, action: PayloadAction<CheckoutPayload['payment']>) => {
      state.paymentData = action.payload
    },
    clearOrderData: (state) => {
      state.deliveryData = null
      state.paymentData = null
    },
  },
})
export const { clearOrderData, setDeliveryData, setPaymentData } = orderSlice.actions
export default orderSlice.reducer

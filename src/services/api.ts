import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Restaurante } from '../pages/Home'

interface ProductPayload {
  id: number // <--- CONFIRME QUE ESTÁ COMO 'number' AQUI
  price: number
}

export interface DeliveryAddress {
  description: string
  zipCode: string
  city: string
  number: number
  complement?: string
}

interface DeliveryPayload {
  receiver: string
  address: DeliveryAddress
}

export interface CardExpires {
  month: number
  year: number
}

interface CardPayload {
  name: string
  number: string
  code: number
  expires: CardExpires
}

interface PaymentPayload {
  card: CardPayload
}

export interface CheckoutPayload {
  products: ProductPayload[]
  delivery: DeliveryPayload
  payment: PaymentPayload
}

interface CheckoutResponse {
  orderId: string
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fake-api-tau.vercel.app/' }),
  endpoints: (builder) => ({
    getRestauranteById: builder.query<Restaurante, string>({
      query: (id) => `api/efood/restaurantes/${id}`,
    }),
    getRestaurantes: builder.query<Restaurante[], void>({
      query: () => 'api/efood/restaurantes',
    }),
    purchase: builder.mutation<CheckoutResponse, CheckoutPayload>({
      query: (body) => ({
        url: 'api/efood/checkout',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetRestauranteByIdQuery, useGetRestaurantesQuery, usePurchaseMutation } = api

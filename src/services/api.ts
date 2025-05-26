import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Restaurante } from '../pages/Home'

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
  }),
})

export const { useGetRestauranteByIdQuery, useGetRestaurantesQuery } = api

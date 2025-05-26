import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ItemCarrinhoUnico } from '../../types/ItemCarrinho'
import CarrinhoFase from '../../types/CarrinhoFase'
import type { Cardapio } from '../../pages/Home'
import { v4 as uuidv4 } from 'uuid'

interface CartState {
  itens: ItemCarrinhoUnico[]
  aberto: boolean
  fase: CarrinhoFase
  numeroPedido: string
}

const initialState: CartState = {
  itens: [],
  aberto: false,
  fase: CarrinhoFase.CARRINHO,
  numeroPedido: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCarrinho: (state, action: PayloadAction<Cardapio>) => {
      const novoItem: ItemCarrinhoUnico = {
        ...action.payload,
        cartItemId: uuidv4(),
      }
      state.itens.push(novoItem)
    },
    removeItemCarrinho: (state, action: PayloadAction<string>) => {
      state.itens = state.itens.filter((item) => item.cartItemId !== action.payload)
    },
    toggleCarrinho: (state) => {
      state.aberto = !state.aberto
      state.fase = CarrinhoFase.CARRINHO
      state.numeroPedido = ''
    },
    fecharCarrinho: (state) => {
      state.aberto = false
      state.fase = CarrinhoFase.CARRINHO
    },
    continuarEntrega: (state) => {
      state.fase = CarrinhoFase.ENTREGA
    },
    continuarPagamento: (state) => {
      state.numeroPedido = Math.floor(10000 + Math.random() * 90000).toString()
      state.fase = CarrinhoFase.PAGAMENTO
    },
    continuarConfirmacao: (state) => {
      state.fase = CarrinhoFase.CONFIRMACAO
    },
    voltarParaOCarrinho: (state) => {
      state.fase = CarrinhoFase.CARRINHO
    },
    voltarParaOEndereco: (state) => {
      state.fase = CarrinhoFase.ENTREGA
    },
    esvaziarCarrinho: (state) => {
      state.itens = []
      state.fase = CarrinhoFase.CARRINHO
      state.aberto = false
      state.numeroPedido = ''
    },
  },
})

export const {
  addCarrinho,
  removeItemCarrinho,
  toggleCarrinho,
  fecharCarrinho,
  continuarEntrega,
  continuarPagamento,
  voltarParaOCarrinho,
  voltarParaOEndereco,
  continuarConfirmacao,
  esvaziarCarrinho,
} = cartSlice.actions

export default cartSlice.reducer

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Cardapio } from '../../pages/Home'

interface ModalState {
  aberto: boolean
  produtoSelecionado: Cardapio | null
}

const initialState: ModalState = {
  aberto: false,
  produtoSelecionado: null,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    abrirModal: (state, action: PayloadAction<Cardapio>) => {
      state.aberto = true
      state.produtoSelecionado = action.payload
    },
    fecharModal: (state) => {
      state.aberto = false
      state.produtoSelecionado = null
    },
  },
})

export const { abrirModal, fecharModal } = modalSlice.actions
export default modalSlice.reducer

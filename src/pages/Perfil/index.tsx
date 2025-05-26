import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { Banner, BannerTextWrapper } from './styles'
import ProdutoList from '../../components/ProdutoList'
import ModalProduto from '../../components/ModalProduto'
import Menu from '../../components/Menu'
import type { Cardapio } from '../Home'
import { CardContainer } from '../../components/RestauranteList/styles'
import { useDispatch, useSelector } from 'react-redux'
import { useGetRestauranteByIdQuery } from '../../services/api'
import {
  addCarrinho,
  continuarConfirmacao,
  continuarEntrega,
  continuarPagamento,
  esvaziarCarrinho,
  fecharCarrinho,
  removeItemCarrinho,
  toggleCarrinho,
  voltarParaOCarrinho,
  voltarParaOEndereco,
} from '../../store/reducers/cart'
import { abrirModal, fecharModal } from '../../store/reducers/modal'
import type { RootState } from '../../store'

const Perfil = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useDispatch()

  const { data: restauranteData } = useGetRestauranteByIdQuery(id!)

  const itensCarrinho = useSelector((state: RootState) => state.cart.itens)
  const carrinhoAberto = useSelector((state: RootState) => state.cart.aberto)
  const faseCarrinho = useSelector((state: RootState) => state.cart.fase)
  const numeroPedido = useSelector((state: RootState) => state.cart.numeroPedido)

  const modalAberto = useSelector((state: RootState) => state.modal.aberto)
  const produtoSelecionado = useSelector((state: RootState) => state.modal.produtoSelecionado)

  const handleAddCarrinho = (produto: Cardapio) => {
    dispatch(addCarrinho(produto))
  }

  const handleAbrirModal = (produto: Cardapio) => {
    dispatch(abrirModal(produto))
  }

  const handleFecharModal = () => {
    dispatch(fecharModal())
  }

  const handleToggleCarrinho = () => {
    dispatch(toggleCarrinho())
  }

  const handleFecharCarrinho = () => {
    dispatch(fecharCarrinho())
  }

  const handleRemoveItemCarrinho = (cartItemIdToRemove: string) => {
    dispatch(removeItemCarrinho(cartItemIdToRemove))
  }

  const handleContinuarEntrega = () => {
    dispatch(continuarEntrega())
  }

  const handleContinuarPagamento = () => {
    dispatch(continuarPagamento())
  }

  const handleContinuarConfimacao = () => {
    dispatch(continuarConfirmacao())
  }

  const handleVoltarParaOCarrinho = () => {
    dispatch(voltarParaOCarrinho())
  }

  const handleVoltarParaOEndereco = () => {
    dispatch(voltarParaOEndereco())
  }

  const handleEsvaziarCarrinho = () => {
    dispatch(esvaziarCarrinho())
  }

  useEffect(() => {
    if (modalAberto || carrinhoAberto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [modalAberto, carrinhoAberto])

  return (
    <>
      <Header
        $isPerfil={true}
        itensCarrinho={itensCarrinho}
        toggleCarrinho={handleToggleCarrinho}
      />
      <Banner>
        <img src={restauranteData?.capa} alt="Banner do Restaurante" />
        <CardContainer style={{ position: 'relative', height: '100%' }}>
          <BannerTextWrapper>
            <h2>{restauranteData?.tipo}</h2>
            <h1>{restauranteData?.titulo}</h1>
          </BannerTextWrapper>
        </CardContainer>
      </Banner>
      <ProdutoList
        produtos={restauranteData?.cardapio || []}
        abrirModal={handleAbrirModal}
        adicionarAoCarrinho={handleAddCarrinho}
      />
      {modalAberto && produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onClose={handleFecharModal}
          adicionarAoCarrinho={handleAddCarrinho}
        />
      )}
      <Menu
        $aberto={carrinhoAberto}
        onClose={handleFecharCarrinho}
        itens={itensCarrinho}
        removeItem={handleRemoveItemCarrinho}
        fase={faseCarrinho}
        continuarEntrega={handleContinuarEntrega}
        voltarParaOCarrinho={handleVoltarParaOCarrinho}
        continuarPagamento={handleContinuarPagamento}
        voltarParaOEndereco={handleVoltarParaOEndereco}
        continuarConfimacao={handleContinuarConfimacao}
        esvaziarCarrinho={handleEsvaziarCarrinho}
        numeroPedido={numeroPedido}
      />
    </>
  )
}
export default Perfil

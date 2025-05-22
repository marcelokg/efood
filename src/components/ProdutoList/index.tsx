import type { Cardapio } from '../../pages/Home'
import Produto from '../Produto'
import { CardProdutosContainer, CardProdutosList } from './styles'

type Props = {
  produtos: Cardapio[]
  abrirModal: (produto: Cardapio) => void
  adicionarAoCarrinho: (produto: Cardapio) => void
}

const ProdutoList = ({ produtos, abrirModal, adicionarAoCarrinho }: Props) => (
  <CardProdutosContainer>
    <CardProdutosList>
      {produtos.map((produto) => (
        <Produto
          key={produto.id}
          descricao={produto.descricao}
          nome={produto.nome}
          foto={produto.foto}
          porcao={produto.porcao}
          preco={produto.preco}
          abrirModal={() => abrirModal(produto)}
          adicionarAoCarrinho={() => adicionarAoCarrinho(produto)} id={0}        />
      ))}
    </CardProdutosList>
  </CardProdutosContainer>
)
export default ProdutoList

import ProdutoModel from '../../models/ProdutoModel'
import Produto from '../Produto'
import { CardProdutosContainer, CardProdutosList } from './styles'

type Props = {
  produtos: ProdutoModel[]
  abrirModal: (produto: ProdutoModel) => void
  adicionarAoCarrinho: (produto: ProdutoModel) => void
}

const ProdutoList = ({ produtos, abrirModal, adicionarAoCarrinho }: Props) => (
  <CardProdutosContainer>
    <CardProdutosList>
      {produtos.map((produto) => (
        <Produto
          key={produto.id}
          description={produto.description}
          title={produto.title}
          image={produto.image}
          abrirModal={() => abrirModal(produto)}
          adicionarAoCarrinho={() => adicionarAoCarrinho(produto)}
        />
      ))}
    </CardProdutosList>
  </CardProdutosContainer>
)
export default ProdutoList

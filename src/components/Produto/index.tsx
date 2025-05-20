import type ProdutoModel from '../../models/ProdutoModel'
import { CardProduto, CardProdutoContent, ButtonAdd } from './styles'

type Props = {
  image: string
  title: string
  description: string
  abrirModal: () => void
  adicionarAoCarrinho: (produto: ProdutoModel) => void
}

const Produto = ({ description, image, title, abrirModal }: Props) => {
  return (
    <CardProduto>
      <img src={image} />
      <CardProdutoContent>
        <h3>{title}</h3>
        <p>{description}</p>
        <ButtonAdd onClick={abrirModal}>Adicionar ao carrinho</ButtonAdd>
      </CardProdutoContent>
    </CardProduto>
  )
}
export default Produto

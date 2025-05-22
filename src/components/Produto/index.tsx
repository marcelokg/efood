import type { Cardapio } from '../../pages/Home'
import { CardProduto, CardProdutoContent, ButtonAdd, ImagemProduto } from './styles'

type Props = {
  foto: string
  nome: string
  descricao: string
  id: number
  preco: number;
  porcao: string
  abrirModal: (produto: Cardapio) => void
  adicionarAoCarrinho: (produto: Cardapio) => void
}

const Produto = ({ descricao, foto, nome, abrirModal, porcao, id, preco }: Props) => {
  const produtoCompleto: Cardapio = {foto, nome, descricao, id, porcao, preco}

  const LimiteCaracteres = 120

  const limitarDescricao = (texto: string, limite: number): string => {
    if(texto.length > limite){
      return texto.slice(0, limite) + '...'
    }
    return texto
  }

  return (
    <CardProduto>
      <ImagemProduto src={foto} />
      <CardProdutoContent>
        <h3>{nome}</h3>
        <p>{limitarDescricao(descricao, LimiteCaracteres)}</p>
        <ButtonAdd onClick={() => abrirModal(produtoCompleto)}>Adicionar ao carrinho</ButtonAdd>
      </CardProdutoContent>
    </CardProduto>
  )
}
export default Produto

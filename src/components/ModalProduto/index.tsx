import type ProdutoModel from '../../models/ProdutoModel'
import {
  ButtonModal,
  ModalContainer,
  ModalContent,
  ModalDetail,
  ModalImage,
  ModalInfos,
} from './styles'
import pizzaCarrinho from '../../assets/images/pizza-carrinho.png'
import { ModalFechar } from '../../styles'

type Props = {
  produto: ProdutoModel
  price?: string
  onClose: () => void
  adicionarAoCarrinho: (produto: ProdutoModel) => void
}

const ModalProduto = ({ produto, onClose, adicionarAoCarrinho }: Props) => {
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDetail>
          <ModalImage>
            <img src={pizzaCarrinho} />
          </ModalImage>
          <ModalInfos>
            <ModalFechar onClick={onClose}>&times;</ModalFechar>
            <h3>Pizza de Marguerita</h3>
            <p>
              A pizza Margherita é uma pizza clássica da culinária italiana, reconhecida por sua
              simplicidade e sabor inigualável. Ela é feita com uma base de massa fina e crocante,
              coberta com molho de tomate fresco, queijo mussarela de alta qualidade, manjericão
              fresco e azeite de oliva extra-virgem. A combinação de sabores é perfeita, com o molho
              de tomate suculento e ligeiramente ácido, o queijo derretido e cremoso e as folhas de
              manjericão frescas, que adicionam um toque de sabor herbáceo. É uma pizza simples, mas
              deliciosa, que agrada a todos os paladares e é uma ótima opção para qualquer ocasião.
              <br />
              <br /> Serve: de 2 a 3 pessoas
            </p>
            <ButtonModal
              onClick={() => {
                adicionarAoCarrinho(produto)
                onClose()
              }}
            >
              Adicionar ao carrinho - R$ {produto.price}
            </ButtonModal>
          </ModalInfos>
        </ModalDetail>
      </ModalContent>
    </ModalContainer>
  )
}

export default ModalProduto

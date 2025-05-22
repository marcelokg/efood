import {
  ButtonModal,
  ModalContainer,
  ModalContent,
  ModalDetail,
  ModalImage,
  ModalInfos,
} from "./styles";
import { ModalFechar } from "../../styles";
import type { Cardapio } from "../../pages/Home";
import { formataPreco } from "../../utils/formatters";

type Props = {
  produto: Cardapio;
  onClose: () => void;
  adicionarAoCarrinho: (produto: Cardapio) => void;
};

const ModalProduto = ({ produto, onClose, adicionarAoCarrinho }: Props) => {
  if(!produto) return null

  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalDetail>
          <ModalImage>
            <img src={produto.foto} />
          </ModalImage>
          <ModalInfos>
            <ModalFechar onClick={onClose}>&times;</ModalFechar>
            <h3>{produto.nome}</h3>
            <p>{produto.descricao}</p>
            <p>{produto.porcao}</p>
            <ButtonModal
              onClick={() => {
                adicionarAoCarrinho(produto);
                onClose();
              }}
            >
              Adicionar ao carrinho - {formataPreco(produto.preco)}
            </ButtonModal>
          </ModalInfos>
        </ModalDetail>
      </ModalContent>
    </ModalContainer>
  );
};

export default ModalProduto;

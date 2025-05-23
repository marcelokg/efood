import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header";
import bannerPerfil from "../../assets/images/fundoPerfil.png";
import { Banner, BannerTextWrapper } from "./styles";
import type Produto from "../../models/ProdutoModel";
import pizza from "../../assets/images/pizza.png";
import ProdutoList from "../../components/ProdutoList";
import type ProdutoModel from "../../models/ProdutoModel";
import ModalProduto from "../../components/ModalProduto";
import Menu from "../../components/Menu";
import CarrinhoFase from "../../types/CarrinhoFase";
import { CardContainer } from "../../components/RestauranteList/styles";

interface ItemCarrinhoUnico extends ProdutoModel {
  cartItemId: string;
}

const produtos: Produto[] = [
  {
    id: 1,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
  {
    id: 2,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
  {
    id: 3,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
  {
    id: 4,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
  {
    id: 5,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
  {
    id: 6,
    image: pizza,
    title: "Pizza de Marguerita",
    description:
      "A clássica Marguerita: molho de tomate suculento, mussarela derretida, manjericão fresco e um toque de azeite. Sabor e simplicidade!",
    price: "60,90",
  },
];

const Perfil = () => {
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] =
    useState<ProdutoModel | null>(null);
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinhoUnico[]>([]);
  const [faseCarrinho, setFaseCarrinho] = useState<CarrinhoFase>(
    CarrinhoFase.CARRINHO
  );
  const [numeroPedido, setNumeroPedido] = useState<string>("");

  const fecharCarrinho = () => {
    setCarrinhoAberto(false);
    setFaseCarrinho(CarrinhoFase.CARRINHO);
    setNumeroPedido("");
  };

  const adicionarCarrinho = (produto: ProdutoModel) => {
    const novoItem: ItemCarrinhoUnico = {
      ...produto,
      cartItemId: uuidv4(),
    };
    setItensCarrinho((prevItens) => [...prevItens, novoItem]);
  };

  const abrirModal = (produto: ProdutoModel) => {
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setProdutoSelecionado(null);
  };

  const toggleCarrinho = () => {
    setCarrinhoAberto(!carrinhoAberto);
    setFaseCarrinho(CarrinhoFase.CARRINHO);
    setNumeroPedido("");
  };

  const removeItem = (cartItemIdToRemove: string) => {
    const novosItens = itensCarrinho.filter(
      (item) => item.cartItemId !== cartItemIdToRemove
    );
    setItensCarrinho(novosItens);
  };

  const continuarEntrega = () => {
    setFaseCarrinho(CarrinhoFase.ENTREGA);
  };

  const continuarPagamento = () => {
    const novoNumero = gerarNumeroPedido();
    setNumeroPedido(novoNumero);
    setFaseCarrinho(CarrinhoFase.PAGAMENTO);
  };

  const continuarConfimacao = () => {
    setFaseCarrinho(CarrinhoFase.CONFIRMACAO);
  };

  const voltarParaOCarrinho = () => {
    setFaseCarrinho(CarrinhoFase.CARRINHO);
  };

  const voltarParaOEndereco = () => {
    setFaseCarrinho(CarrinhoFase.ENTREGA);
  };

  const gerarNumeroPedido = (): string => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const esvaziarCarrinho = () => {
    setItensCarrinho([]);
    setCarrinhoAberto(false);
    setFaseCarrinho(CarrinhoFase.CARRINHO);
    setNumeroPedido("");
  };

  useEffect(() => {
    if (modalAberto || carrinhoAberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalAberto, carrinhoAberto]);

  return (
    <>
      <Header
        $isPerfil={true}
        itensCarrinho={itensCarrinho}
        toggleCarrinho={toggleCarrinho}
      />
      <Banner>
        <img src={bannerPerfil} alt="Banner do Restaurante" />
        <CardContainer style={{ position: "relative", height: "100%" }}>
          <BannerTextWrapper>
            <h2>Italiana</h2>
            <h1>La Dolce Vita Trattoria</h1>
          </BannerTextWrapper>
        </CardContainer>
      </Banner>
      <CardContainer>
        <ProdutoList
          produtos={produtos}
          abrirModal={abrirModal}
          adicionarAoCarrinho={adicionarCarrinho}
        />
      </CardContainer>
      {modalAberto && produtoSelecionado && (
        <ModalProduto
          produto={produtoSelecionado}
          onClose={fecharModal}
          adicionarAoCarrinho={adicionarCarrinho}
        />
      )}
      <Menu
        $aberto={carrinhoAberto}
        onClose={fecharCarrinho}
        itens={itensCarrinho}
        removeItem={removeItem}
        fase={faseCarrinho}
        continuarEntrega={continuarEntrega}
        voltarParaOCarrinho={voltarParaOCarrinho}
        continuarPagamento={continuarPagamento}
        voltarParaOEndereco={voltarParaOEndereco}
        continuarConfimacao={continuarConfimacao}
        esvaziarCarrinho={esvaziarCarrinho}
        numeroPedido={numeroPedido}
      />
    </>
  );
};
export default Perfil;

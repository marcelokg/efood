import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { Banner, BannerTextWrapper } from "./styles";
import ProdutoList from "../../components/ProdutoList";
import ModalProduto from "../../components/ModalProduto";
import Menu from "../../components/Menu";
import CarrinhoFase from "../../types/CarrinhoFase";
import type { Cardapio, Restaurante } from "../Home";
import { CardContainer } from "../../components/RestauranteList/styles";

interface ItemCarrinhoUnico extends Cardapio {
  cartItemId: string;
}

const Perfil = () => {
  const { id } = useParams<{ id: string }>();

  const [restauranteData, setRestauranteData] = useState<Restaurante>();

  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Cardapio | null>(
    null
  );
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinhoUnico[]>([]);
  const [faseCarrinho, setFaseCarrinho] = useState<CarrinhoFase>(
    CarrinhoFase.CARRINHO
  );
  const [numeroPedido, setNumeroPedido] = useState<string>("");

  useEffect(() => {
    fetch(`https://fake-api-tau.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((res) => setRestauranteData(res));
  }, [id]);

  const fecharCarrinho = () => {
    setCarrinhoAberto(false);
    setFaseCarrinho(CarrinhoFase.CARRINHO);
    setNumeroPedido("");
  };

  const adicionarCarrinho = (produto: Cardapio) => {
    const novoItem: ItemCarrinhoUnico = {
      ...produto,
      cartItemId: uuidv4(),
    };
    setItensCarrinho((prevItens) => [...prevItens, novoItem]);
  };

  const abrirModal = (produto: Cardapio) => {
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
        <img src={restauranteData?.capa} alt="Banner do Restaurante" />
        <CardContainer style={{ position: "relative", height: "100%" }}>
          <BannerTextWrapper>
            <h2>{restauranteData?.tipo}</h2>
            <h1>{restauranteData?.titulo}</h1>
          </BannerTextWrapper>
        </CardContainer>
      </Banner>
      <ProdutoList
        produtos={restauranteData?.cardapio || []}
        abrirModal={abrirModal}
        adicionarAoCarrinho={adicionarCarrinho}
      />
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

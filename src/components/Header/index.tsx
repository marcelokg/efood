import { Cart, Container, HeaderBar, HeaderTitle, Link, Logo } from "./styles";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import type { ItemCarrinhoUnico } from "../../types/ItemCarrinho";

interface Props {
  $isPerfil?: boolean; 
  title?: string;
  itensCarrinho?: ItemCarrinhoUnico[];
  toggleCarrinho?: () => void;
}

const Header = ({ $isPerfil, title, itensCarrinho, toggleCarrinho }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const itemCount = itensCarrinho ? itensCarrinho.length : 0;

  return (
    <HeaderBar $isPerfil={$isPerfil}>
      <Container $isPerfil={$isPerfil}>
        {$isPerfil && <Link onClick={handleClick}>Restaurantes</Link>}
        <Logo $isPerfil={$isPerfil}>
          <img src={logo} alt="Logo" />
        </Logo>
        {$isPerfil && (
          <Cart onClick={toggleCarrinho}>
            {itemCount} Produto(s) no carrinho
          </Cart>
        )}
        {!$isPerfil && title && (
          <HeaderTitle $isPerfil={$isPerfil}>{title}</HeaderTitle>
        )}
        {!$isPerfil && !title && (
          <HeaderTitle>
            Viva experiências gastronômicas <br /> no conforto da sua casa
          </HeaderTitle>
        )}
      </Container>
    </HeaderBar>
  );
};
export default Header;

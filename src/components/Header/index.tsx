import { Cart, HeaderBar, HeaderTitle, Link, Logo } from './styles'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import type ProdutoModel from '../../models/ProdutoModel'

interface Props {
  $isPerfil?: boolean
  title?: string 
  itensCarrinho?: ProdutoModel[]
  toggleCarrinho?: () => void
}

const Header = ({ $isPerfil, title, itensCarrinho, toggleCarrinho }: Props) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  const itemCount = itensCarrinho ? itensCarrinho.length : 0

  return (
    <HeaderBar $isPerfil={$isPerfil}>
      {$isPerfil && <Link onClick={handleClick}>Restaurantes</Link>}
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      {$isPerfil && <Cart onClick={toggleCarrinho}>{itemCount} Produto(s) no carrinho</Cart>}
      {!$isPerfil && title && (
        <HeaderTitle $isPerfil={$isPerfil}>
          {title}
        </HeaderTitle>
      )}
      {!$isPerfil && !title && (
        <HeaderTitle>
          Viva experiências gastronômicas <br /> no conforto da sua casa
        </HeaderTitle>
      )}
    </HeaderBar>
  )
}
export default Header

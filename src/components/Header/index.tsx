import { Cart, HeaderBar, HeaderTitle, Link, Logo } from './styles'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import type ProdutoModel from '../../models/ProdutoModel'

interface Props {
  $isPerfil?: boolean // Indica se é a página de perfil
  title?: string // Título opcional para a home
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
      {' '}
      {/* O contêiner principal */}
      {$isPerfil && <Link onClick={handleClick}>Restaurantes</Link>}
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>{' '}
      {/* O logo é sempre exibido */}
      {$isPerfil && <Cart onClick={toggleCarrinho}>{itemCount} Produto(s) no carrinho</Cart>}
      {/* Bloco 1: Exibe o título se NÃO for a página de perfil E um título for fornecido */}
      {!$isPerfil && title && (
        <HeaderTitle $isPerfil={$isPerfil}>
          {' '}
          {/* Aqui, isPerfil será false */}
          {title}
        </HeaderTitle>
      )}
      {/* Bloco 2: Exibe o título padrão se NÃO for a página de perfil E NENHUM título for fornecido */}
      {!$isPerfil && !title && (
        <HeaderTitle>
          {' '}
          {/* Título padrão da home */}
          Viva experiências gastronômicas <br /> no conforto da sua casa
        </HeaderTitle>
      )}
    </HeaderBar>
  )
}
export default Header

import styled from 'styled-components'
import HeaderImg from '../../assets/images/fundo.png'
import { cores } from '../../styles'

interface PropsHeader {
  $isPerfil?: boolean
}

export const HeaderBar = styled.header<PropsHeader>`
  background-image: url(${HeaderImg});
  width: 100%;
  height: ${(props) => (props.$isPerfil ? '186px' : '384px')};
  display: flex;
  flex-direction: ${(props) => (props.$isPerfil ? 'row' : 'column')};
  justify-content: ${(props) => (props.$isPerfil ? 'space-around' : 'center')};
  align-items: center;
  text-align: center;
  position: relative;
`
export const HeaderTitle = styled.h1<PropsHeader>`
  display: flex;
  font-size: 36px;
  font-weight: bold;
  padding-bottom: 40px;
  padding-top: 160px;
  color: ${cores.vermelhoClaro};
`
export const Logo = styled.div<PropsHeader>`
  ${(props) =>
    props.$isPerfil
      ? `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding-bottom: 10px;
      `
      : `
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        transform: none;
      `}
`

export const Link = styled.a`
  text-decoration: none;
  color: ${cores.vermelhoClaro};
  font-weight: bold;
  cursor: pointer;
  padding-right: 70px;
`
export const Cart = styled.p`
  color: ${cores.vermelhoClaro};
  font-weight: bold;
  cursor: pointer;
`

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
  position: relative;
  text-align: center;
  color: ${cores.rosa};
`
export const Container = styled.div<PropsHeader>`
  max-width: 1024px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;

  ${(props) =>
    props.$isPerfil
      ? `
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 24px;
      `
      : `
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
`

export const HeaderTitle = styled.h1<PropsHeader>`
  font-size: ${(props) => (props.$isPerfil ? '32px' : '36px')};
  font-weight: bold;
  color: ${cores.vermelhoClaro};
  margin: 0;
  width: 100%;

  ${(props) =>
    props.$isPerfil
      ? `
    align-self: flex-start;
    margin-top: auto;
    margin-bottom: 0;
    padding: 0;
  `
      : `
    padding-top: 160px;
    padding-bottom: 40px;
  `}
`

export const Logo = styled.div<PropsHeader>`
  img {
    max-width: 125px;
    width: 100%;
    display: block;
  }

  ${(props) =>
    props.$isPerfil
      ? `
        position: static;
        transform: none;
        margin: 0;
        padding: 0;
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
  font-size: 18px;
`
export const Cart = styled.p`
  color: ${cores.vermelhoClaro};
  font-weight: bold;
  cursor: pointer;
  font-size: 18px;
`

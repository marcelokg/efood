import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  vermelhoClaro: '#E66767',
  rosa: '#FFEBD9',
  branco: '#FFFFFF',
}

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
    list-style: none;
  }

`
export const ModalFechar = styled.span`
  font-size: 30px;
  font-weight: 100;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`

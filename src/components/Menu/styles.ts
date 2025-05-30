import styled from 'styled-components'
import { cores } from '../../styles'

export const Sidebar = styled.aside<{ $aberto: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $aberto }) => ($aberto ? '0' : '-360px')};
  width: 360px;
  height: 100vh;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  background-color: ${cores.vermelhoClaro};
  overflow-y: auto;
  overflow-x: hidden;
`

export const ButtonContinuarEntrega = styled.button`
  background-color: ${cores.rosa};
  color: ${cores.vermelhoClaro};
  font-weight: 700;
  font-size: 14px;
  max-width: 344px;
  height: 24px;
  width: 100%;
  cursor: pointer;
  border: none;
  margin: 16px 8px;
`

export const CarrinhoList = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: column;
  color: ${cores.rosa};
  margin-top: 36px;
`
export const CarrinhoInfos = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  color: ${cores.vermelhoClaro};
  height: 100%;

  h3 {
    font-size: 18px;
    font-weight: 900;
    margin-top: 12px;
  }

  span {
    margin-top: 12px;
    font-size: 14px;
  }
`
export const CarrinhoItemImg = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  margin-left: 8px;
  object-fit: cover;
`
export const CarrinhoItemContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  background-color: ${cores.rosa};
  width: 344px;
  height: 100px;
  margin-left: 8px;
`
export const RemoveButton = styled.button`
  position: absolute;
  right: 15px;
  margin-top: 56px;
  color: ${cores.vermelhoClaro};
  border: none;
  background-color: transparent;
  cursor: pointer;
`
export const MenuFechar = styled.span`
  font-size: 30px;
  font-weight: 100;
  cursor: pointer;
  position: absolute;
  left: 10px;
  color: ${cores.rosa};
`
export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 700;
  padding: 8px;
  color: ${cores.rosa};
`
export const Overlay = styled.div<{ $aberto: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
  display: ${({ $aberto }) => ($aberto ? 'block' : 'none')};
`
export const FormContainer = styled.div`
  margin: 32px 8px;
  color: ${cores.rosa};
  font-weight: 700;

  .botaoEntrega {
    width: 330px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
`
export const TituloMenu = styled.h2`
  font-size: 16px;
  margin-bottom: 16px;
  margin-top: 45px;
`

export const Form = styled.form`
  font-size: 14px;

  small{
    font-size: 10px;
    display: block;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  input {
    height: 32px;
    width: 344px;
    margin-bottom: 8px;
  }

  .containerCepNumero {
    display: inline-block;

    input {
      width: 130px;
      margin-right: 34px;
    }
  }

  .containerNumCartao {
    display: inline-block;

    input {
      width: 220px;
    }
  }

  .containerCVV {
    display: inline-block;
    margin-left: 44px;

    input {
      width: 80px;
    }
  }

  .containerMesVencimento {
    display: inline-block;
    margin-right: 34px;
    input {
      width: 155px;
    }
  }

  .containerAnoVencimento {
    display: inline-block;

    input {
      width: 155px;
    }
  }
`

export const ButtonContainer = styled.div`
  max-width: 344px;
  margin-top: 24px;
`
export const ButtonMenu = styled.button`
  display: block;
  width: 100%;
  margin-bottom: 8px;
  background-color: ${cores.rosa};
  color: ${cores.vermelhoClaro};
  font-weight: 700;
  font-size: 14px;
  height: 24px;
  cursor: pointer;
  border: none;
`

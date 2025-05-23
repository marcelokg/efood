import styled from 'styled-components'
import { cores } from '../../styles'

export const CardContainer = styled.div`
  color: ${cores.vermelhoClaro};
  margin-bottom: 60px;
  position: relative;
  background-color: white;
  overflow: hidden;
  border-left: 1px solid ${cores.vermelhoClaro};  /* Borda esquerda */
  border-right: 1px solid ${cores.vermelhoClaro}; /* Borda direita */
  border-bottom: 1px solid ${cores.vermelhoClaro}; /* Borda inferior */
  border-top: none; /* Mantém a borda superior removida */

  > img {
    width: 100%;
    height: 217px;
    display: block;
  }
`
export const CardContent = styled.div`
  padding: 8px;
`

export const CardTitulo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`
export const CardDescricao = styled.p`
  font-size: 14px;
  padding: 8px;
`
export const CardBotao = styled.button`
  font-size: 14px;
  padding: 4px 6px;
  color: white;
  border: none;
  background-color: ${cores.vermelhoClaro};
  margin: 8px;
  font-weight: bold;
  cursor: pointer;
`
export const Infos = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`

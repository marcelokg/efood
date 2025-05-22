import styled from 'styled-components'
import { cores } from '../../styles'

export const CardContainer = styled.div`
  color: ${cores.vermelhoClaro};
  margin-bottom: 60px;
  position: relative;
  > img {
    max-width: 470px;
    height: 220px;;
    width: 100%;
    object-fit: cover;
    border: none;
  }
`
export const CardContent = styled.div`
  border: 1px solid ${cores.vermelhoClaro};
  border-top: transparent;
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

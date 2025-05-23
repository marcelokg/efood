import styled from 'styled-components'
import { cores } from '../../styles'

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`
export const ModalContent = styled.div`
  position: relative;
  max-width: 1024px;
  background-color: ${cores.vermelhoClaro};
`

export const ModalDetail = styled.div`
  display: flex;
`

export const ModalImage = styled.div`
  margin: 32px;
  justify-content: center;
  align-items: center;

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
  }
`

export const ModalInfos = styled.div`
  flex-grow: 1;
  color: ${cores.branco};
  width: 60%;
  margin-top: 32px;

  h3 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }
`
export const ButtonModal = styled.button`
  background-color: ${cores.rosa};
  color: ${cores.vermelhoClaro};
  font-weight: bold;
  font-size: 14px;
  max-width: 218px;
  height: 24px;
  width: 100%;
  cursor: pointer;
  border: none;
`

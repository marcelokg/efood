import styled from 'styled-components'
import { cores } from '../../styles'

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 280px;
    object-fit: cover;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    z-index: 1;
  }

  h2 {
    position: absolute;
    z-index: 2;
    top: 20px;
    left: 140px;
    font-weight: 100;
    color: ${cores.branco};
  }
`

export const BannerTitulo = styled.h1`
  position: absolute;
  z-index: 2;
  top: 200px;
  left: 140px;
  color: ${cores.branco};
  font-weight: bold;
`

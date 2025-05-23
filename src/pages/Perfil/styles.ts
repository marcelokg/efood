import styled from "styled-components";
import { cores } from "../../styles";

export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  img {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 1;
    z-index: 1;
  }
`;
export const BannerTitulo = styled.h1`
  z-index: 2;
  color: ${cores.branco};
  font-weight: bold;
`;
export const BannerTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  z-index: 2;
  padding: 8px 0;

  h2 {
    font-weight: 100;
    color: ${cores.branco};
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 20px;
    font-size: 32px;
  }

  h1 {
    color: ${cores.branco};
    font-size: 32px;
    font-weight: bold;
    margin-top: auto;
    padding-bottom: 20px;
  }
`;

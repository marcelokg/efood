import styled from "styled-components";
import { cores } from "../../styles";

export const CardProduto = styled.div`
  max-width: 320px;
  width: 100%;
  height: 338px;
  background-color: ${cores.vermelhoClaro};
  margin-bottom: 32px;
  color: ${cores.rosa};
  padding-bottom: 8px;
`;

export const ImagemProduto = styled.img`
  width: 304px;
  height: 167px;;
  border-radius: 4px;
  margin: 8px 8px;
`;

export const CardProdutoContent = styled.div`
  margin: 8px;
  padding-bottom: 8px;
  h3 {
    font-size: 16px;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 8px;
  }
`;
export const ButtonAdd = styled.button`
  background-color: ${cores.rosa};
  color: ${cores.vermelhoClaro};
  font-weight: bold;
  max-width: 304px;
  height: 24px;
  width: 100%;
  cursor: pointer;
  border: none;
`;

import styled from 'styled-components'
import { cores } from '../../styles'

export const FooterContainer = styled.div`
  background-color: ${cores.rosa};
  height: 298px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${cores.vermelhoClaro};

  > img {
    margin-top: 40px;
  }
`
export const ContainerSocial = styled.ul`
  display: flex;
  margin-top: 32px;
`
export const SocialItem = styled.li`
  margin-right: 8px;

  img {
    width: 24px;
    height: 24px;
  }
`
export const FooterDescription = styled.p`
  font-size: 10px;
  margin-top: 80px;
`

import logo from '../../assets/images/logo.png'
import insta from '../../assets/images/insta.png'
import face from '../../assets/images/face.png'
import twitter from '../../assets/images/twitter.png'
import { ContainerSocial, FooterContainer, FooterDescription, SocialItem } from './styles'

const Footer = () => (
  <FooterContainer>
    <img src={logo} />
    <ContainerSocial>
      <SocialItem>
        <a href="#">
          <img src={insta} />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="#">
          <img src={face} />
        </a>
      </SocialItem>
      <SocialItem>
        <a href="#">
          <img src={twitter} />
        </a>
      </SocialItem>
    </ContainerSocial>
    <FooterDescription>
      A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega,
      qualidade dos produtos é toda do estabelecimento contratado.
    </FooterDescription>
  </FooterContainer>
)
export default Footer

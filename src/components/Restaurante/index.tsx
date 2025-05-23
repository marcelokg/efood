import {
  CardBotao,
  CardContainer,
  CardContent,
  CardDescricao,
  CardTitulo,
  Infos,
} from "./styles";
import estrela from "../../assets/images/estrela.png";
import Tag from "../Tag";
import { useNavigate } from "react-router-dom";

export type Props = {
  description: string;
  image: string;
  title: string;
  infos: string[];
  rating: number;
  id: number;
};

const Restaurante = ({
  description,
  image,
  infos,
  rating,
  title,
  id,
}: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/perfil/${id}`);
  };

  return (
    <>
      <CardContainer>
        <Infos>
          {infos.map((info) => (
            <Tag key={info}>{info}</Tag>
          ))}
        </Infos>
        <img src={image} />
        <CardContent>
          <CardTitulo>
            <h3>{title}</h3>
            <h3>
              {rating} <img style={{ width: "21px" }} src={estrela} />
            </h3>
          </CardTitulo>
          <CardDescricao>{description}</CardDescricao>
          <CardBotao onClick={handleClick}>Saiba mais</CardBotao>
        </CardContent>
      </CardContainer>
    </>
  );
};
export default Restaurante;

import RestauranteModel from '../../models/Restaurante'
import Product from '../Restaurante'
import { CardContainer, List } from './styles'

export type Props = {
  restaurantes: RestauranteModel[]
}

const RestauranteList = ({ restaurantes }: Props) => (
  <CardContainer>
    <List>
      {restaurantes.map((restaurante) => (
        <Product
          key={restaurante.id}
          description={restaurante.description}
          image={restaurante.image}
          infos={restaurante.infos}
          title={restaurante.title}
          rating={restaurante.rating}
        />
      ))}
    </List>
  </CardContainer>
)
export default RestauranteList

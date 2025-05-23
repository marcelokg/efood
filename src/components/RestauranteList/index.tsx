import type { Restaurante } from '../../pages/Home'
import Product from '../Restaurante'
import { CardContainer, List } from './styles'

type Props = {
  restaurantes: Restaurante[]
}

const RestauranteList = ({ restaurantes }: Props) => {
  const getTags = (restaurante: Restaurante) => {
    const tags = []

    if (restaurante.tipo) {
      tags.push(restaurante.tipo)
    }

    if (restaurante.destacado === true) {
      tags.push('Destaque')
    }

    return tags
  }

  return (
    <CardContainer>
      <List>
        {restaurantes.map((restaurante) => (
          <Product
            key={restaurante.id}
            description={restaurante.descricao}
            image={restaurante.capa}
            infos={getTags(restaurante)}
            title={restaurante.titulo}
            rating={restaurante.avaliacao}
            id={restaurante.id}
          />
        ))}
      </List>
    </CardContainer>
  )
}
export default RestauranteList

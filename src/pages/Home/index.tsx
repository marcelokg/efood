import Header from '../../components/Header'
import RestauranteList from '../../components/RestauranteList'
import { useGetRestaurantesQuery } from '../../services/api'

export type Cardapio = {
  foto: string
  preco: number
  id: number
  nome: string
  descricao: string
  porcao: string
}

export type Restaurante = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: Cardapio[]
}

const Home = () => {
  const { data: restaurantesData, isLoading, isError } = useGetRestaurantesQuery()

  if (isLoading) {
    return <div>Carregando restaurantes...</div>
  }

  if (isError) {
    return (
      <div>Ocorreu um erro ao carregar os restaurantes. Por favor, tente novamente mais tarde.</div>
    )
  }
  if (!restaurantesData) {
    return <div>Nenhum restaurante encontrado.</div>
  }
  return (
    <>
      <Header />
      <RestauranteList restaurantes={restaurantesData} />
    </>
  )
}

export default Home

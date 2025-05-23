import type RestauranteModel from '../../models/Restaurante'
import sushi from '../../assets/images/sushi.png'
import italiana from '../../assets/images/italiana.png'
import Header from '../../components/Header'
import RestauranteList from '../../components/RestauranteList'

const restaurantes: RestauranteModel[] = [
  {
    id: 1,
    title: 'Hioki Sushi',
    image: sushi,
    infos: ['Destaque da semana', 'Japonesa'],
    description:
      'Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega rápida, embalagens cuidadosas e qualidade garantida. Experimente o Japão sem sair do lar com nosso delivery!',
    rating: 4.9,
  },
  {
    id: 2,
    title: 'La Dolce Vita Trattoria',
    image: italiana,
    infos: ['Italiana'],
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'La Dolce Vita Trattoria',
    image: italiana,
    infos: ['Italiana'],
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    rating: 4.8,
  },
  {
    id: 4,
    title: 'La Dolce Vita Trattoria',
    image: italiana,
    infos: ['Italiana'],
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    rating: 4.8,
  },
  {
    id: 5,
    title: 'La Dolce Vita Trattoria',
    image: italiana,
    infos: ['Italiana'],
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    rating: 4.8,
  },
  {
    id: 6,
    title: 'La Dolce Vita Trattoria',
    image: italiana,
    infos: ['Italiana'],
    description:
      'A La Dolce Vita Trattoria leva a autêntica cozinha italiana até você! Desfrute de massas caseiras, pizzas deliciosas e risotos incríveis, tudo no conforto do seu lar. Entrega rápida, pratos bem embalados e sabor inesquecível. Peça já!',
    rating: 4.8,
  },
]

const Home = () => (
  <>
    <Header />
    <RestauranteList restaurantes={restaurantes} />
  </>
)
export default Home

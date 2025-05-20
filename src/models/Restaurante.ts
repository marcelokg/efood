class RestauranteModel {
  description: string
  image: string
  title: string
  infos: string[]
  rating: number
  id: number

  constructor(
    description: string,
    image: string,
    title: string,
    infos: string[],
    rating: number,
    id: number,
  ) {
    this.description = description
    this.image = image
    this.title = title
    this.infos = infos
    this.rating = rating
    this.id = id
  }
}
export default RestauranteModel

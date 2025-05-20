class ProdutoModel {
  image: string
  title: string
  description: string
  price: string
  id: number

  constructor(image: string, title: string, description: string, id: number, price: string) {
    this.image = image
    this.title = title
    this.description = description
    this.id = id
    this.price = price
  }
}

export default ProdutoModel

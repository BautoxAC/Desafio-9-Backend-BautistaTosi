import { fakerES } from '@faker-js/faker'
export class MockingProductsService {
  createMockProducts () {
    const Createthumbnails = () => {
      const thumbnails = []
      const numOfThumbnails = parseInt(
        fakerES.string.numeric({ length: 1, exclude: ['0'] })
      )
      for (let i = 0; i < numOfThumbnails; i++) {
        thumbnails.push(fakerES.image.url())
      }
      return thumbnails
    }
    const products = []
    for (let i = 0; i < 100; i++) {
      products.push({
        title: fakerES.commerce.product(),
        description: fakerES.commerce.productDescription(),
        code: fakerES.database.mongodbObjectId(),
        stock: fakerES.finance.amount(),
        price: fakerES.commerce.price(),
        thumbnails: [...Createthumbnails()],
        status: fakerES.datatype.boolean(),
        category: fakerES.commerce.productAdjective()
      })
    }
    return products
  }
}

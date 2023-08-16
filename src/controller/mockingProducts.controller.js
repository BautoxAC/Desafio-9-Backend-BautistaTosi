import { MockingProductsService } from '../services/mockingProducts.service.js'
const MockingProductsManager = new MockingProductsService()
export class MockingProductsController {
  async createMockProducts (req, res) {
    const products = MockingProductsManager.createMockProducts()
    return res.json(products).status(200)
  }
}

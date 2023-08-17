import fs from 'fs'
import { newMessage } from '../../utils/utils.js'
import { v4 as uuidv4 } from 'uuid'

export class ProductManager {
  constructor (path) {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '[]')
    }
    this.path = path
    this.products = JSON.parse(fs.readFileSync(path, 'utf-8'))
  }

  async addProduct (title, description, price, thumbnails, code, stock) {
    const product = { title, description, price: Number(price), thumbnails: thumbnails !== undefined && [thumbnails], code, stock: Number(stock) }
    let id = uuidv4()
    while (this.products.some(pro => pro.id === id)) {
      id = uuidv4()
    }
    let addPro = true
    const productValues = Object.values(product)
    for (const prop of productValues) {
      if (!prop) {
        addPro = false
        break
      }
    }
    const codeVerificator = this.products.find((productToFind) => productToFind.code === code)
    if (codeVerificator) {
      return newMessage('failure', 'Error, the code is repeated', '')
    } else if (!addPro) {
      return newMessage('failure', 'Error, data is incomplete please provide more data and the stock and the price must be numbers', '')
    } else {
      this.products.push({ ...product, id, status: true })
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
      const lastAdded = this.products[this.products.length - 1]
      return newMessage('success', 'Product added successfully', lastAdded)
    }
  }

  async updateProduct (id, propsReceivedToUpdate) {
    const productToUpdate = this.getProductById(id).data
    const valuesRecieved = Object.entries(propsReceivedToUpdate)
    const valuesToUpdate = Object.keys(productToUpdate)
    const dataTypes = Object.entries(productToUpdate).map((prop) => ({ key: prop[0], type: prop[0] === 'thumbnails' ? 'string' : typeof (prop[1]) }))
    const messages = []
    if (!productToUpdate || Array.isArray(propsReceivedToUpdate)) {
      return newMessage('failure', 'The product was not found or the data is an Array', '')
    }
    const propToUpdateFound = valuesRecieved.map((prop) => {
      const status = valuesToUpdate.some((propUpdate) => prop[0] === propUpdate && prop[0] !== 'id' && prop[0] !== 'status')
      return { entries: { key: prop[0], value: prop[1] }, status, type: typeof (prop[1]) }
    })
    for (let i = 0; i < propToUpdateFound.length; i++) {
      const prop = propToUpdateFound[i]
      const sameTypeAndKey = dataTypes.find((type) => type.type === prop.type && type.key === prop.entries.key)
      const sameKey = dataTypes.find(type => type.key === prop.entries.key)
      if (prop.status && sameTypeAndKey) {
        if (prop.entries.key === 'thumbnails') {
          const thumbnailRepeated = productToUpdate.thumbnails.some(thumbnail => thumbnail === prop.entries.value)
          thumbnailRepeated ? messages.push(` The prop Number: ${i + 1} (${prop.entries.key}) has a value repeated`) : productToUpdate.thumbnails.push(prop.entries.value)
        } else {
          productToUpdate[prop.entries.key] = prop.entries.value
        }
      } else {
        messages.push(` The prop Number: ${i + 1} (${prop.entries.key}) was provided incorrectly`)
        prop.status ? messages.push(`Must be ${sameKey?.type}`) : messages.push('The prop must be title, description, price, thumbnails, code or stock')
      }
    }
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    return newMessage('success', 'Updated successfully' + (messages).toString(), productToUpdate)
  }

  getProducts () {
    return this.products
  }

  getProductById (id) {
    const productFindId = this.products.find((product) => product.id === id)
    if (productFindId) {
      return newMessage('success', 'Found successfully', productFindId)
    } else {
      return newMessage('failure', 'Not Found', '')
    }
  }

  async deleteProduct (id) {
    const productToDelete = this.getProductById(id).data
    if (!productToDelete) { return this.getProductById(id) }
    const positionProductToDelete = this.products.indexOf(productToDelete)
    this.products.splice(positionProductToDelete, 1)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    return newMessage('success', 'Deleted successfully', productToDelete)
  }
}
export class CartManager {
  constructor (path) {
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, '[]')
    }
    this.path = path
    this.carts = JSON.parse(fs.readFileSync(path, 'utf-8'))
  }

  getCartById (id) {
    const cartFindId = this.carts.find((cart) => cart.idCarrito === id)
    if (cartFindId) {
      return newMessage('success', 'Found successfully', cartFindId.productos)
    } else {
      return newMessage('failure', 'Not Found', '')
    }
  }

  async addCart () {
    let id = uuidv4()
    while (this.carts.some(pro => pro.id === id)) {
      id = uuidv4()
    }
    this.carts.push({ productos: [], idCarrito: id })
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    const lastAdded = this.carts[this.carts.length - 1]
    return newMessage('success', 'Cart added successfully', lastAdded)
  }

  async addProduct (idCart, idProduct) {
    const listProducts = new ProductManager('src/public/products.json')
    const cart = this.carts.find(cartToFind => cartToFind.idCarrito === idCart)
    if (!cart) {
      return newMessage('failure', 'cart not found', '')
    }
    const product = listProducts.getProductById(idProduct).data
    if (!product) {
      return newMessage('failure', 'product not found', '')
    }
    const productRepeated = cart.productos.find(pro => pro.idProduct === product.id)
    let messageReturn = {}
    if (productRepeated) {
      const positionProductRepeated = cart.productos.indexOf(productRepeated)
      if (cart.productos[positionProductRepeated].quantity < product.stock) {
        cart.productos[positionProductRepeated].quantity++
        messageReturn = newMessage('success', 'Product repeated: quantity added correctly', cart)
      } else {
        messageReturn = newMessage('failure', 'Product repeated: quantity is iqual to the stock', cart)
      }
    } else {
      cart.productos.push({ idProduct: product.id, quantity: 1 })
      messageReturn = newMessage('success', 'Product added correctly', cart)
    }
    await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2))
    return messageReturn
  }
}

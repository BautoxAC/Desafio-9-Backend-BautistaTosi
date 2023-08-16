// eslint-disable-next-line no-undef
const socket = io()
const url = window.location.origin
const code = document.getElementById('code')
const title = document.getElementById('title')
const description = document.getElementById('description')
const stock = document.getElementById('stock')
const file = document.getElementById('file')
const price = document.getElementById('price')
const list = document.getElementById('list')
function renderProducts (products) {
  list.innerHTML = ''
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const imgs = product.thumbnails.map((thumbnail) => (`<img src="${thumbnail}">`))
    list.innerHTML += `<li>
        <h2>Nombre: ${product.title}</h2>
        <p>Descripcion: ${product.description}</p>
        <p>Stock: ${product.stock}</p>
        <p>Precio: ${product.price}</p>
        <p>Codigo: ${product.code}</p>
        <p>Id: ${product._id}</p>
        <p>Img: ${imgs}</p>
        <button id="${product._id}"><img src="quitar.png" alt="Eliminar producto"
        title="Eliminar producto"></button>
        </li>`
  }
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const { _id } = product
    document.getElementById(_id).addEventListener('click', () => {
      socket.emit('msg_front_to_back_delete_product', product)
    })
  }
}
document.getElementById('buttonSumbit').addEventListener('click', () => {
  const data = { title: title.value, description: description.value, price: Number(price.value), thumbnails: file?.files[0]?.name ? url + file?.files[0]?.name : undefined, code: code.value, stock: Number(stock.value) }
  socket.emit('msg_front_to_back', { data })
})
socket.on('newProduct_to_front', (product, products) => {
  if (product.status !== 'success') {
    alert(product.message)
  } else {
    alert(product.message)
    renderProducts(products)
  }
})
socket.on('msg_back_to_front_products', ({ payload }) => {
  renderProducts(payload)
  for (let i = 0; i < payload.length; i++) {
    const product = payload[i]
    document.getElementById(product._id).addEventListener('click', () => {
      socket.emit('msg_front_to_back_delete_product', product)
    })
  }
})
socket.on('msg_front_to_back_deleted', ({ payload }) => {
  list.innerHTML = ''
  renderProducts(payload)
})

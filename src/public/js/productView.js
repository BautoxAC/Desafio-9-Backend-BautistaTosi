const URLactual = window.location.href
const port = window.location.port
const queries = URLactual.split('?')
// eslint-disable-next-line no-undef
const socket = io()
const email = document.getElementById('email')
fetch(`http://localhost:${port}/api/products?${queries[1]}`)
  .then(res => res.json())
  .then(data => {
    for (const product of data.payload) {
      document.getElementById('agregateOne' + product._id).addEventListener('click', () => {
        socket.emit('add_product_to_cart_front_to_back', { idProduct: product._id, email: email.innerHTML })
      })
    }
    for (const product of data.payload) {
      document.getElementById('linkDetail' + product._id).addEventListener('click', (e) => {
        e.stopPropagation()
      })
    }
  })
  .catch(error => console.log(error))
socket.on('add_product_to_cart_back_to_front', (data) => {
  if (data.status === 'success') {
    alert('producto agregado correctamente')
  } else {
    alert('ha ocurrido un error')
  }
})

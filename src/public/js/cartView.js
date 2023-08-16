const buttonPurchase = document.getElementById('buttonPurchase')
const url = window.location.href
const origin = window.location.origin
const cartId = url.split('/').pop()
buttonPurchase.addEventListener('click', async () => {
  await fetch(`${origin}/api/carts/${cartId}/purchase`, { method: 'POST' })
    .then((response) => {
      if (!response.ok) {
        console.log(response)
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      alert('compra realizada')
      setTimeout(() => {
        location.reload()
      }, 10000)
    })
    .catch(error => console.log(error))
})

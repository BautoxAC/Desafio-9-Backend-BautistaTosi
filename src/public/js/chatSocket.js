const buttonSumbit = document.getElementById('buttonSumbit')
const newMessage = document.getElementById('newMessage')
const userName = document.getElementById('userName')
const listMessages = document.getElementById('listMessages')
// eslint-disable-next-line no-undef
const socket = io()
buttonSumbit.addEventListener('click', (e) => {
  e.preventDefault()
  const user = userName.innerHTML.slice(8)
  if (newMessage.value) {
    socket.emit('new_message_front_to_back', newMessage.value, user)
  } else {
    alert('el mensaje debe contener algo')
  }
})
socket.on('message_created_back_to_front', (messages) => {
  listMessages.innerHTML = ''
  for (const message of messages.data.reverse()) {
    listMessages.innerHTML += `
        <li class="boxMessage">
            <p class="user">Usuario:${message.user}</p>
            <p class="message">Mensaje:${message.message}</p>
        </li>
        `
  }
}
)

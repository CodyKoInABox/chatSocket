const socket = io('http://localhost:3000')

const messageForm = document.getElementById('messageForm')
const messageInput = document.getElementById('messageInput')
const messageContainer = document.getElementById('messagesContainer')

const username = prompt("Please choose an username:")
socket.emit('newUser', username)

//new chat message
socket.on('chatMessage', data =>{
    appendMessage(`${data.username}: ${data.message}`)
})

//new user has connected
socket.on('userConnected', data =>{
    appendMessage(`${data.username} has connected.`)
    updateUserAmount(data.userCount)
})

//user has disconnected
socket.on('userDisconnected', username =>{
    appendMessage(`${username} has disconnected.`)
})

//handle form submission
messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`)
    socket.emit('sendChatMessage', message)
    messageInput.value = ''
})

//create a new message element on the UI
function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}




//update amount of users connected

function updateUserAmount(amount){
    console.log('There are ' + amount + ' users connected')
    document.getElementById('extraInfoUserAmount').innerHTML = '<b>' + amount + '</b> users connected'
}
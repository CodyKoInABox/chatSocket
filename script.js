const socket = io('https://chatsocketbackend.onrender.com')

const messageForm = document.getElementById('messageForm')
const messageInput = document.getElementById('messageInput')
const messageContainer = document.getElementById('messages')

const username = prompt("Please choose an username:")
document.getElementById('extraInfoUsername').innerHTML = 'Username: '+ username +'</p>'
socket.emit('newUser', username)

let userAmount;

//new chat message
socket.on('chatMessage', data =>{
    appendMessage(`${data.username}: ${data.message}`)
})

//new user has connected
socket.on('userConnected', data =>{
    appendMessage(`${data.username} has connected.`)
    updateUserAmount(data.userCount)
    userAmount = data.userCount
})

//user has disconnected
socket.on('userDisconnected', username =>{
    appendMessage(`${username} has disconnected.`)
    updateUserAmount(userAmount - 1)
    userAmount--
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
    document.getElementById('extraInfoUserAmount').innerText = amount + ' users connected'
}
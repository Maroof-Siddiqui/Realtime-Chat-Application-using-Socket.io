const socket = io('http://127.0.0.1:8000');           
// note don't write localhost:8000 there a difference between 127.0.0.1 & localhost in socket.io
const form = document.getElementById('sent-container');

const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector('.container');

const append =  (message,position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

const name_of_user = prompt('Please enter your name:');
socket.emit('new-user-joined', name_of_user);

//display the name of the user at client side.
// console.log('user joined at client side',name_of_user);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value = '';
})

socket.on('user-joined', name =>{
    append(`${name} joined the chat`,'left');
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`,'left');
})

socket.on('left', data =>{
    append(`${data.name} left the chat`,'left');
})


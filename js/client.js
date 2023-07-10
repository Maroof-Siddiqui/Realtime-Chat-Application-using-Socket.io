const socket = io('http://127.0.0.1:8000');           
// note don't write localhost:8000 there a difference between 127.0.0.1 & localhost in socket.io
const form = document.getElementById('send-container');

const message = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');


const name_of_user = prompt('Please enter your name:');
socket.emit('new-user-joined', name_of_user);
console.log('user joined at client side',name_of_user);

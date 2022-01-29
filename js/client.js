const socket = io('http://localhost:8000')
const form = document.getElementById('send-con')
const messageinput = document.getElementById('messageinp')
const messagecont = document.querySelector('.container')
var audio=new Audio('cute-sms-tune-wapking-38422.mp3')

const append=(message,position)=>{
    const messagelement=document.createElement('div');
    messagelement.innerText=message;
    messagelement.classList.add('message');
    messagelement.classList.add(position);
    messagecont.append(messagelement);

    if(position=='left'){

        audio.play();       
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageinput.value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageinput.value='';


})


const name = prompt("enter your name to join ")
socket.emit('new-user-joined', name)

socket.on('user-joined',name=>{
    append(`${name}joined the chat `,'right')
})
socket.on('resieve', data=>{
    append(`${data.name}:${data.message} `,'left')
})
socket.on('leave', name=>{
    append(`${name} left the chat `,'left')
})



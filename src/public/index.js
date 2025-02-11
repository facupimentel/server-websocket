// cliente de socket

const socket = io()

let user
let chatBox = document.getElementById("chatBox")

swal.fire({
    title: "Identificate",
    input: "text",
    text:"ingresa un usuario",
    inputValidator: (value) => {
        return !value && "debes ingresar un usuario"
    },
    allowOutsideClick: false,
}).then(result =>{
    user = result.value
    socket.emit('authenticated', user)

})

chatBox.addEventListener("keyup", event =>{
    if(event.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs", data =>{
    let log = document.getElementById("messageLogs");
    let messages = ""
    data.forEach(message =>{
        messages =
          messages + `${message.user} dice: ${message.message}</br>`;
        log.innerHTML = messages
    }
    )
})

socket.on("newUserConnected", user =>{
    swal.fire({
        icon: "success",
        title: "Nuevo usuario conectado",
        text: user,
        timer: 5000,
        showConfirmButton: false,
        icon: 'info'    
    }
)}
)




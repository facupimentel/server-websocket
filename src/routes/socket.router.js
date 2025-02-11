// servidor de socket

import { socketServer } from "../../server.js";

let messages = []
console.log(messages);


const socketCb = (socket) =>{
    console.log('new connection ' + socket.id);

    socket.on('authenticated', user =>{
        console.log('user authenticated: ' + user);

        // event 1: para el usuario recien conectado, le enviará todos los mensajes que se han enviado
        socket.emit('messageLogs', messages)

        //event 2: para los demas usuarios conectados, les informa que se ha conectado un nuevo usuario
        socket.broadcast.emit('newUserConnected', user)

        
    })

    // on: escuchamos el evento message
    socket.on('message', data=>{
        messages.push(data)

        //event 3: emit a socketServer: enviamos el mensaje a todo el servidor
        socketServer.emit('messageLogs', messages)
    } )
}

export default socketCb




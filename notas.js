// estoy escuchando un mensaje del cliente
    socket.on("message", (data)=>{
        console.log(data)

    })
 
    // emit individual
    socket.emit("message-individual", "este mensaje lo debe recibir el socket que lo emitio")

    // emit a todos los clientes menos el que emite
    socket.broadcast.emit("message-broadcast", "este mensaje lo deben recibir todos los sockets menos el que lo emitio")

    // emit a todos los clientes conectados
    socketServer.emit("message-all", "este mensaje lo deben recibir todos los sockets conectados")

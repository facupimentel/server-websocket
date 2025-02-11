const socket = io()

socket.emit("message", "hola desde el cliente")

socket.on("message-individual", (data)=>{
    console.log(data)
})

socket.on("message-broadcast", (data)=>{
    console.log(data)
})

socket.on("message-all", (data)=>{
    console.log(data)
})                                                                                                                                             
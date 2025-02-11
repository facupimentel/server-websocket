import express, { application } from "express"
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import viewsRouter from "./src/routes/views.router.js"
import __dirname from "./utils.js"


// se arma el servidor tipico de http
const server = express()
const port = 8080
const httpServer = server.listen(port, ()=>{
    console.log(`server ready on port ${port}`);
    
})

// aqui lo pasamos con socket

const socketServer = new Server(httpServer)

// configuracion de handlebars y archivos estaticos

server.engine('handlebars', handlebars.engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname+ "/src/views")
server.use(express.static(__dirname+ '/src/public'))

// rutas

server.use("/", viewsRouter)

// server side
// configuracion de websocket

socketServer.on('connection', (socket) => {     
    console.log('socket connected', socket.id);  

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

})

export {socketServer}


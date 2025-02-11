import express from "express"
import { Server } from "socket.io"
import handlebars from "express-handlebars"
import viewsRouter from "./src/routes/views.router.js"
import socketCb from "./src/routes/socket.router.js"
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

socketServer.on("connection", socketCb);

export {socketServer}


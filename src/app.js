import express from "express";
import { router as productsRouter } from "./router/ProductsRouter.js";
import { router as cartRouter} from "./router/CartRouter.js";
import { router as viewsRouter} from "./router/viewsRouter.js";
import { engine } from "express-handlebars";
import { join } from "path";
import { Server } from "socket.io";
import { productsManager } from "./dao/productsManager.js";

let serverSocket;
const app = express();
const PORT = 8080; 
let ruta = join(import.meta.dirname, "public");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use('/', (req, res, next)=>{
    req.serverSocket=serverSocket;
    next();
}, viewsRouter);
app.use(express.static(ruta));

const serverHTTP = app.listen(
    PORT, () => console.log(`Servidor en linea en el puerto: ${PORT}`)
);
serverSocket = new Server(serverHTTP);

    /* console.log("Socket.IO connection established");
    socket.on("get-request", (data) => {
        const responseData = { message: "This is a response to the GET request" };
        socket.emit("get-response", responseData);
    }); */
serverSocket.on("connection", (socket) => {
    console.log("Socket.IO connection established");
    socket.on("filtrarPorId", (id) => {
        productsManager.getProductById(id).then((product) => {
            socket.emit("filtrarPorIdResponse", { product });
        }).catch((error) => {
            console.error(error);
            socket.emit("filtrarPorIdResponse", { error: "Error al obtener los productos" });
        });
    });
});
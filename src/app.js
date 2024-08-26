import express from "express";
import { router as productsRouter } from "./router/ProductsRouter.js";
import { router as cartRouter} from "./router/CartRouter.js";
import { router as viewsRouter} from "./router/viewsRouter.js";
import { engine } from "express-handlebars";
import { join } from "path";
import { Server } from "socket.io";

const app = express();
const PORT = 8080; 
let serverSocket 
let ruta = join(import.meta.dirname, "public");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use('/', viewsRouter);
app.use(express.static(ruta));

/* app.get('/', async(req, res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('Animo, ha sido duro, pero yo creo en ti')
}); */

const serverHTTP = app.listen(
    PORT, () => console.log(`Servidor en linea en el puerto: ${PORT}`)
);
serverSocket = new Server(serverHTTP);

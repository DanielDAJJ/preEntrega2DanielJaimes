import { Router } from "express";
import { cartManager } from "../dao/cartManager.js";

export const router = Router();
cartManager.path = './src/data/cart.json';

router.get('/', async (req, res) => {
    let cart
    try {
        cart = await cartManager.getCart()
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({error:'Error retrieving cart'});
    };
    res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({cart})
});
router.get('/:cId', async (req, res) => {
    let {cId} = req.params;
    cId = Number(cId);
    if (isNaN(cId)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Id de carrito invalido'});
    }
    let cart
    try {
        cart = await cartManager.getCart();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado con el carrito'});
    };
    let item = cart.find(i=> i.cId === cId);
    if (!item) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({error: 'No se encontro item en el carrito'});
    };
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({item});    
});
router.post('/:id', async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Id de producto invalido'});
    };
    let itemCart = await cartManager.addProduct(id);
    if (!itemCart) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({error: 'No se encontro el producto'});
    };
    try {
        
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al agregar producto al carrito'});
    };
    res.setHeader('Content-Type', 'application/json');
    return res.status(201).json({itemCart});
});
router.put('/:cId', async (req, res) => {
    let {cId} = req.params;
    cId = Number(cId);
    if (isNaN(cId)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Id de carrito invalido'});
    };
    let updateProductQuantity
    try {
        updateProductQuantity = await cartManager.updateProductQuantity(cId);
        if (!updateProductQuantity) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({error: 'No se encontro el producto'});
        }
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al actualizar la cantidad del producto en el carrito'});
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({updateProductQuantity});
})
router.delete('/:id', async (req, res) => {
    let {id} = req.params;
    id = Number(id);
    if (isNaN(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({error: 'Id de producto invalido'});
    };
    let removeProduct
    try {
        removeProduct = await cartManager.removeProduct(id);
        if (!removeProduct) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(404).json({error: 'No se encontro el producto'});
        }
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({error: 'Error inesperado al eliminar el producto del carrito'});
    }
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({removeProduct})
});
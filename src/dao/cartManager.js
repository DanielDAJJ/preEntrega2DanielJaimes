import fs from "fs";
import { productsManager } from "./productsManager.js";

export class cartManager {
    static path;
    static async getCart(){
        try {
            if (fs.existsSync(this.path)) {
                return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            } else {
                return [];
            }
        } catch (error) {
            return console.error("Error reading cart file:", error);
        }
    };
    static async addProduct(productId){
        let cart = await this.getCart();
        let product = await productsManager.getProductById(productId);
        if (!product) {
            throw new Error('El producto no existe')
        };
        let quantity = 1;
        let cId = 1;
        if (cart.length > 0) {
            cId = Math.max(...cart.map(i=> i.cId))+1;
        };
        let newCartProduct = {
            cId,
            quantity,
            ...product
        }
        cart.push(newCartProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'), {encoding:'utf-8'});
        return newCartProduct;
    };
    static async removeProduct(productId){
        const cart = await this.getCart();
        const index = cart.findIndex(i=> i.id===productId);
        if (index === -1) {
            throw new Error('El producto no está en el carrito')
        };
        if (index.quantity === 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity -= 1;
        };
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'), {encoding:'utf-8'});
        return cart[index];
    };
    static async updateProductQuantity(productId){
        const cart = await this.getCart();
        const index = cart.find(i=> i.id===productId);
        if (index === -1) {
            throw new Error('El producto no está en el carrito')
        };
        let {quantity} = index;
        quantity += 1;
        index.quantity = quantity; 
        await fs.promises.writeFile(this.path, JSON.stringify(cart, null, '\t'), {encoding:'utf-8'});
        return index;
    };
}
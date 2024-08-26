import fs from "fs";

export class productsManager{
    static path;
    static async getProducts(){
        if (fs.existsSync(this.path)) {
            return JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        } else {
            return [];
        }
    };
    static async getProductById(id){
        try {
            let products = await this.getProducts();
            let product = products.find(p=>p.id === id);
            return product
        } catch (error) {
            return console.error(`Error buscando el producto: ${error.message}`);
        }
    }
    static async addProducts(product={}){
        try {
            let products = await this.getProducts();
            let id = 1;
            if (products.length > 0) {
                id = Math.max(...products.map(p=>p.id)) + 1;
            };
            let newProduct = {
                id,
                ...product
            };
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), {encoding:'utf-8'});
            return newProduct;
        } catch (error) {
            console.error(`Error al agregar el producto: ${error.message}`);
            return null;
        }
    };
    static async updateProduct(id, updatedProduct={}){
        try {
            let products = await this.getProducts();
            let index = products.findIndex(p=>p.id === id);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }
            let updatedProductWithId = {
                id: products[index].id,
                ...updatedProduct
            };
            products[index] = updatedProductWithId;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), {encoding:'utf-8'});
            return updatedProductWithId;
        } catch (error) {
            console.error(`Error actualizar el producto: ${error.message}`);
            return null;
        }
    };
    static async deleteProduct(id){
        try {
            let products = await this.getProducts();
            let index = products.findIndex(p=>p.id === id);
            if (index === -1) {
                throw new Error('Producto no encontrado');
            }
            products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'), {encoding:'utf-8'});
            return products.length > 0;
        } catch (error) {
            console.error(`Error al eliminar el producto: ${error.message}`);
            return null;
        }
    };
}
import { Product } from './../interfaces/product';
import { Request, Response } from 'express';
import ProductSchema from '../models/modelProduct'


abstract class ManageProducts{

    public async postProducts(
        req: Request,
        res: Response
    ){

    const {
        codProduct,
        iva,
        name,
        category,
        price,
        priceBuy,
        imgURL,
        imgId,
        description,
        caducidad

    } = req.body;
    console.log(req.body);
    

       const product:Product =  new ProductSchema(
            {
                codProduct,
                iva,
                name,
                category,
                price,
                priceBuy,
                imgURL,
                imgId,
                description,
                caducidad
            }
        )        
        await product.save();
        res.send("Product creado")

    }

    public async getProducts(){}

    public async getProductsId(){}

    public async getProductsIdCategory(){}

    public async putProducts(){}

    public async deleteProducts(){}
}


export default ManageProducts;
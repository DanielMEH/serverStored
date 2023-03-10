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

    public async getProducts(res:Response,req:Request):Promise<void>{
        const products:Product[] = await ProductSchema.find();
       //res.send(products);
       console.log(products);
       res.render("Productssssss",
    products[0])
       
    }
    public async getProductsId(res:Response, req: Request):Promise<void>{
        const product = await ProductSchema.findById(req.params.id);
        console.log(product);
        
        res.send(product);
    }

    public async getProductsIdCategory(res:Response,req: Request):Promise<void>{
        const product = await ProductSchema.findById(req.params.id);
        res.send(product) ;
    }

    public async putProducts(res:Response, req:Request):Promise<void>{
        const product = await ProductSchema.findByIdAndUpdate(req.params.id)
        res.send( product);
    }

    public async deleteProducts(res:Response, req:Request){
        const product = await ProductSchema.findByIdAndDelete(req.params.id);
        return product;
    }
}


export default ManageProducts;
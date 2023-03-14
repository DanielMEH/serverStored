import { Product } from "./../interfaces/product";
import { Request, Response } from "express";
import ProductSchema from "../models/modelProduct";

abstract class ManageProducts {
  public async postProducts(req: Request, res: Response) {
    const {
      iva,
      name,
      category,
      price,
      priceBuy,
      imgURL,
      imgId,
      description,
      caducidad,
    } = req.body;
    console.log(req.body);

    const product: Product = new ProductSchema({
      iva,
      name,
      category,
      price,
      priceBuy,
      imgURL,
      imgId,
      description,
      caducidad,  
    });
  const produ =  await product.save();
  console.log(produ);


    res.send("Product creado");
  }

  public async getProducts( req: Request, res: Response): Promise<void> {
    const products: Product[] = await ProductSchema.find();
    console.log(products);
    res.send(products)
  }
  public async getProductsId(req:Request, res:Response): Promise<void> {
    const product = await ProductSchema.findById(req.params.id);
    console.log(product);
    res.send(product);
  }

  public async getProductsIdCategory(
    req:Request, res:Response
  ): Promise<void> {
    const product = await ProductSchema.findById(req.params.id);
    res.send(product);
  }

  public async putProducts(req:Request, res:Response): Promise<void> {
    const product = await ProductSchema.findByIdAndUpdate(req.params.id);
    res.send(product);
  }

  public async deleteProducts(req:Request, res:Response) {
    const product = await ProductSchema.findByIdAndDelete(req.params.id);
    return product;
  }
}

export default ManageProducts;

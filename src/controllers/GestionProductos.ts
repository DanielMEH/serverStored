import { Product } from "./../interfaces/product";
import { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config";

abstract class ManageProducts {
  public async postProducts(req: Request, res: Response) {
 
    try {
      const {
        iva,
        name,
        category,
        price,
        priceBuy,
        fechaInicio,
        description,
        fechaFin,
      } = req.body.data;
    

      const tokenCreate: string = req.headers["x-id-token"] as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      } else {

        // coment code for test
        console.log("Hellow");
        
        const product: Product = new ProductSchema({
          iva,
          name,
          tokenIdUser,
          category,
          price,
          priceBuy,
          fechaInicio,
          description,
          fechaFin,
        });
        const produ = await product.save();

        return res
          .status(200)
          .json({ ok: true, message: "Producto creado correctamente",data: produ });
      }
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {

      const tokenCreate: string = req.params._id;
     
      
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const products: Product[] = await ProductSchema.find({
        tokenIdUser,
      });

     const data = ()=>{
        products
      }
      
     
      return res.status(200).json({ ok: true, products });
    } catch (error) {
    
      return res
        .status(500)
        .json({ ok: false, message: error });
    }
  }
  public async getProductsId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {

      const tokenCreate: string = req.headers["id-token"] as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const product = await ProductSchema.findById(req.params.id);
      console.log(product);
      return res.status(200).json({ ok: true, data: product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async getProductsIdCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request> {
    try {
      const tokenCreate: string = req.headers["id-token"] as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }
      const idCategory = req.params.idCategory;
      const product = await ProductSchema.find({ idCategory }, { tokenIdUser });
      console.log(product);
      return res.status(200).json({ ok: true, product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async putProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    console.log("body",req.body);
    
    try {

      const tokenCreate: string = req.headers["id-token"] as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }

      const product = await ProductSchema.findByIdAndUpdate(req.params.id,req.body.data,{
        new: true,
      });
      console.log(product);

      return res
        .status(200)
        .json({ ok: true, message: "Product Update", product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }

  public async deleteProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {


      const tokenCreate: string = req.headers["id-token"] as string;
      const verifyToken: Array<any> | any = jwt.verify(tokenCreate, SECRET)!;
      const tokenIdUser = verifyToken.id;

      if (!tokenIdUser) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      }
      const product = await ProductSchema.findByIdAndDelete(req.params.id,{tokenIdUser});
      return res
        .status(200)
        .json({ ok: true, message: "Product Delete", product });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }
}

export default ManageProducts;

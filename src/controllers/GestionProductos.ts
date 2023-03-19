import { Product } from "./../interfaces/product";
import { Request, Response, NextFunction } from "express";
import ProductSchema from "../models/modelProduct";

abstract class ManageProducts {
  public async postProducts(req: Request, res: Response) {
    try {
      const {
        iva,
        name,
        idCategory,
        price,
        priceBuy,
        fechaCreacion,
        description,
        caducidad,
      } = req.body;
      console.log(req.body);

      const tokenCreate: string = req.headers["id-token"] as string;
      console.log(tokenCreate);

      if (!tokenCreate) {
        return res
          .status(400)
          .json({ ok: false, message: "No existe el token" });
      } else {
        const product: Product = new ProductSchema({
          iva,
          name,
          idCategory,
          price,
          priceBuy,
          fechaCreacion,
          description,
          caducidad,
        });
        const produ = await product.save();

        return res
          .status(200)
          .json({ ok: true, message: "Producto creado correctamente" });
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
      const products: Product[] = await ProductSchema.find();
      console.log(products);
      return res.status(200).json({ ok: true, products });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, message: "Error en el servidor" });
    }
  }
  public async getProductsId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | Request | any> {
    try {
      const product = await ProductSchema.findById(req.params.id);
      console.log(product);
      return res.status(200).json({ ok: true, product });
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
      const idCategory = req.params.idCategory;
      const product = await ProductSchema.find({ idCategory });
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
    try {
      const product = await ProductSchema.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
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
      const product = await ProductSchema.findByIdAndDelete(req.params.id);
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

import { Request, Response, NextFunction } from "express";
import CategorySchema from "../models/CategoryM";
import { category } from "../interfaces/CategoryI";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; 
abstract class Categorys {


  public async createCategory( 
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    
    try {
      
      const {name_category,description,imgURL,imgId} = req.body.data;    
      const Tokenid_U:any = req.headers["x-id-token"]  
      const verifyToken: Array<any> | any = jwt.verify( Tokenid_U, SECRET )!;
      const tokeIdUser = verifyToken.id;
      console.log(tokeIdUser);
      
      if(!tokeIdUser){
        return res.status(400).json({
          ok: false,
          message: 'No existe el token'
      })
      }else{
        const data: category = new CategorySchema({
          tokeIdUser,
          name_category,
          description,
          imgURL,
          imgId
        })
        const dataCategory = await data.save();
        console.log(dataCategory);
        

        
          return res.status(201).json({
              status : 201,
              message: 'Categoria creada',
              data: dataCategory
  
  
          })
      }
        
    } catch (error) {
      console.log("error categoria");
      
        return res.status(500).json({
            ok: false,
            message: 'Error al crear la categoria',
            error
        })
        
    }


  }

  public async getCategory(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {

    

   try {
    const Tokenid_U:any = req.params.id  
    const verifyToken: Array<any> | any = jwt.verify( Tokenid_U, SECRET )!;

    const tokeIdUser = verifyToken.id;

    if(!tokeIdUser){
      return res.status(400).json({
        ok: false,
        message: 'No existe el token'
    })
    }

    const dataCategory = await CategorySchema.find({tokeIdUser});
    return res.status(200).json({
      ok: true,
      message: 'Categorias',  
      data: dataCategory
    })

   } catch (error) {
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener las categorias',
      error
    })

  }
}
  public async getCategoryId(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      const Tokenid_U:any = req.headers["x-id-token"]  
      const verifyToken: Array<any> | any = jwt.verify( Tokenid_U, SECRET )!;
  
      const tokeIdUser = verifyToken.id;
  
      if(!tokeIdUser){
        return res.status(400).json({
          ok: false,
          message: 'No existe el token'
      })
      }
  
      const dataCategory = await CategorySchema.findById(req.params._id);
      return res.status(200).json({
        ok: true,
        message: 'Categorias',  
        data: dataCategory
      })
  
     } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error al obtener las categorias',
        error
      })
  
    }

  }

  public async putCategory(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {

    console.log("---",req.params._id);
    console.log("body",req.body);
    try {
      
      const {name_category,description} = req.body.data;    
      const Tokenid_U:any = req.headers["x-id-token"]  
      const verifyToken: Array<any> | any = jwt.verify( Tokenid_U, SECRET )!;

      const tokeIdUser = verifyToken.id;
      if(!tokeIdUser){
        return res.status(400).json({
          ok: false,
          message: 'No existe el token'
      })
      }else{
      
        const ipdateCategory = await CategorySchema.findByIdAndUpdate(req.params._id,req.body.data,{
          new: true
        });
          return res.status(200).json({
              ok: true,
              message: 'update_category',
              data: ipdateCategory
  
  
          })
      }
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: 'Error_category',
            error
        })
        
    }


  }

  public async deleteCategory(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {
    try {
      const Tokenid_U:any = req.headers["x-id-token"]  
      
      const verifyToken: Array<any> | any = jwt.verify( Tokenid_U, SECRET )!;
  
      const tokeIdUser = verifyToken.id;
  
      if(!tokeIdUser){
        return res.status(400).json({
          ok: false,
          message: 'No existe el token'
      })
      }
  
      const dataCategory = await CategorySchema.findByIdAndDelete(req.params._id);
      return res.status(200).json({
        ok: true,
        message: 'Delete category',  
        data: dataCategory
      })
  
     } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error al eliminar  las categorias',
        error
      })
  
    }


  }

  
  public async getCategoryProducts(
    req: Request,
    res: Response,
    next: Partial<NextFunction>
  ): Promise<Response | Request | any> {}
}

export default Categorys;
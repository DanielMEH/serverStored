 import { Request, Response, NextFunction, json } from 'express';
 import ProductSchema from "../models/modelProduct";
import { Product } from '../interfaces/product';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
  
abstract class AllModules{

    public async getModules(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {
            
          const TokenCreate:string = req.params.id
          const veryfyToken: Array<any> |any = jwt.verify(TokenCreate,SECRET)!;
          const TokenIdUser = veryfyToken;

          if(!TokenIdUser){
            return res.json({
                message:"El token no existe!"
            })
          }
          const dataProduct:Product[] = await ProductSchema.find(TokenIdUser)
          console.log(dataProduct);
          return res.status(200).json({ ok: true, dataProduct}
          )
          
        } catch (error) {
           return res.status(500).json({error, message : 'ERROR_SERVER'})            
        }
    }




}

export default AllModules;
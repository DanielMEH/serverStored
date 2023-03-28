 import { Request, Response, NextFunction, json } from 'express';
 import ProductSchema from "../models/modelProduct";
import CategorySchema from '../models/CategoryM';
import ProviderSchema from '../models/modelProviders';
import { Product } from '../interfaces/product';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';
import CategoryM from '../models/CategoryM';


  
 class AllModules {

    public async getModules(
        req:Request |any, res:Response|any,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {
            
          const TokenCreate:string = req.headers["x-id-token"]!;
          const veryfyToken: Array<any> |any = jwt.verify(TokenCreate,SECRET)!;
          const TokenIdUser = veryfyToken;

          if(!TokenIdUser){
            return res.json({
                message:"El token no existe!"
            })
          }

          else{
            
            const dataProduct:Product[] = await ProductSchema.find({TokenIdUser})
            const dataCategory = await CategorySchema.find({TokenIdUser})
            const dataProvider = await ProviderSchema.find({TokenIdUser})
            return res.status(200).json({ ok: true, dataCategory,dataProduct,dataProvider})
          }
          
         
         
          
        } catch (error) {
           return res.status(500).json({error, message : 'ERROR_SERVER'})            
        }
    }


}

export default AllModules;
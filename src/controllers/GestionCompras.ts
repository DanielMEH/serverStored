import { Request, Response, NextFunction } from 'express';
abstract class ManageCompras{
    public async getCompras(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {
          
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default ManageCompras;

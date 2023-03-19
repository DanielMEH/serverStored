import { Request, Response, NextFunction } from 'express';

abstract class ManageCompras{
    public async getCompras(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {
          //  const compras = await ComprasSchema.find();
           // return res.status(200).json(compras);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
}

export default ManageCompras;
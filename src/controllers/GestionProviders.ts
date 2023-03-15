
import { Request, Response, NextFunction } from 'express';
import ProviderSchema from '../models/modelProviders';
import { Provider } from '../interfaces/providers';

abstract class ManageProviders{
    public async postProviders(req: Request, res: Response, next: NextFunction): Promise<Response| Request| any> {

        try {
            const productIdCategory:any = req.params.id;
            const { name,company, email, phone, address} = req.body;
            const provider:Provider = new ProviderSchema({
                productIdCategory, name, company, email, phone, address
            });

            const prov = await provider.save();
            console.log(prov);
            return res.status(201).json({
                message: 'Provider created'
            });
           
        } catch (error) {

            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
            
        }
        
    }
    public async getProviders(){}
    public async getProvidersId(){}
    public async putProviders(){}
    public async deleteProviders(){}
    public async getProvidersProducts(){}
}

export default ManageProviders;
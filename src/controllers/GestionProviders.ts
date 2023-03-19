
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
    public async getProviders(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response| Request| any> {
        try {
            const providers = await ProviderSchema.find();
            return res.status(200).json(providers);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
 
    public async getProvidersId(
        req: Request, res: Response, next: NextFunction

    ):Promise<Request|Response|any>{
        try {
            const provider = await ProviderSchema.findById(req.params.id);
            return res.status(200).json(provider);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });  
        }
    }
    public async putProviders(
        req: Request, res: Response, next: NextFunction
    ):Promise<Request|Response|any>{
        try {
            const { name, company, email, phone, address } = req.body;
            const provider = await ProviderSchema.findByIdAndUpdate(req.params.id, {
                name, company, email, phone, address
            });
            return res.status(200).json({
                message: 'Provider updated'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }

    public async deleteProviders(
        req: Request, res: Response, next: NextFunction
    ):Promise<Request|Response|any>{
        try {
            const provider = await ProviderSchema.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: 'Provider deleted'
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
   
    public async getProvidersProducts(
        req: Request, res: Response, next: NextFunction
    ):Promise<Request|Response|any>{
        try {
            const provider = await ProviderSchema.find({productIdCategory: req.params.id});
            return res.status(200).json(provider);
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
   
}

export default ManageProviders;
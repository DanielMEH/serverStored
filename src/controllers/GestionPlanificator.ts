import { Request, Response, NextFunction } from 'express';

abstract class ManagePlanificator{
    public async getPlanificator(
        req:Request, res:Response,
        next:NextFunction
    ):Promise<Request|Response|any>{
        try {
        //     const planificator = await PlanificatorSchema.find();
        } catch (error) {
            
        }
    }
}

export default ManagePlanificator;
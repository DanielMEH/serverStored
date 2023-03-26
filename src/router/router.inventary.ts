import {Router} from 'express'
import { Request, Response, NextFunction } from "express";
import InventoryProduct from '../controllers/GestionInventory'
const router:Router = Router()


class RouterInventory extends InventoryProduct
{

    public GetInventory(){
        router.get('/inventory',this.getInventory)
        return router;
    }

    public GetInventoryId(){
        router.get('/inventory/:_id',this.getInventoryId)
        return router;
    }

    public PutInventoryId(){
        router.put('/inventory/:_id',this.putInventoryId)
        return router;
    }
    // public PostInventory(){
    //     router.post('/inventory',this.postInventory)
    //     return router;

    public DeleteInventoryId(){
        router.delete('/inventory/:_id',this.deleteInventoryId)
        return router;
    }


}

export default RouterInventory;
import { Request, Response, NextFunction } from "express";
import CategorySchema from "../models/CategoryM";
import { category } from "../interfaces/CategoryI";
import jwt from "jsonwebtoken";
import { SECRET } from "../config/config"; 

class InventoryProduct {

    public async getInventory(){}
    public async getInventoryId(){}
    public async putInventoryId(){}
    public async deleteInventoryId(){}
   
}

export default InventoryProduct;
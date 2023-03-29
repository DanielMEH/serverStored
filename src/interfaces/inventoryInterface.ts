import mongoose from 'mongoose';


export interface inventory extends mongoose.Document{

    tokeIdUser:string,
    name_inventory: string,
    description: string,
    idCategory: string,
    idProducto: string,
    nameProduto: string,
    price: number,
    priceBuy: number,

}
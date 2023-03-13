import mongoose from 'mongoose';


export interface Product extends mongoose.Document{
    iva: number;
    name: string;
    category: string;
    price: number;
    priceBuy:number;
    imgURL: string;
    imgId : number;
    description: string;
    caducidad: Date;
}
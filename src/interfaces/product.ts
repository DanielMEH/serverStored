import mongoose from 'mongoose';


export interface Product extends mongoose.Document{
    codProduct :number;
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
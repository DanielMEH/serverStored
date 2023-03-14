import mongoose from 'mongoose';


export interface Product extends mongoose.Document{
    iva: number;
    name: string;
    tokeIdUser: string;
    category: string;
    price: number;
    priceBuy:number;
    description: string;
    caducidad: Date;
    timestamps: boolean;
}
import mongoose from 'mongoose';


export interface Product extends mongoose.Document{
    iva: number;
    name: string;
    tokenIdUser: string;
    category: string;
    price: number;
    priceBuy:number;
    description: string;
    fechaInicio: string;
    fechaFin: string;
    timestamps: boolean;
}
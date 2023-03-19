import mongoose from 'mongoose';


export interface Product extends mongoose.Document{
    iva: number;
    name: string;
    tokeIdUser: string;
    idCategory: string;
    price: number;
    priceBuy:number;
    description: string;
    fechaInicio: string;
    fechaFin: string;
    timestamps: boolean;
}
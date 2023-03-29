import mongoose from 'mongoose';

export interface Provider extends mongoose.Document{
    idCategory: string;
    tokenIdUser: string;
    name: string;
    company: string;
    email: string;
    phone:number;
    address: string;
    fecha: string;
}



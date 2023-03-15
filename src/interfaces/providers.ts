import mongoose from 'mongoose';

export interface Provider extends mongoose.Document{
    productIdCategory: string;
    name: string;
    company: string;
    email: string;
    phone:number;
    address: string;
    timestamps: boolean;
}



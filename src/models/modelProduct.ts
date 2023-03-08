import mongoose,{Schema, model} from 'mongoose';
import {Product} from '../interfaces/product';

const ProductSchema = new Schema({
    codProduct :BigInt,
    iva: BigInt,
    name: String,
    category: String,   
    price: Number,
    priceBuy:Number,
    imgURL: String,
    imgId : BigInt,
    description: String,
    caducidad: Date,
});

export default model<Product>('Product', ProductSchema);
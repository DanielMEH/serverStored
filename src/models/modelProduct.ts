import mongoose,{Schema, model} from 'mongoose';
import {Product} from '../interfaces/product';


const ProductSchema = new Schema({
    codProduct :{type:Number, require:true, unique:true},
    iva: Number,
    name: {type:String, require:true},
    category: String,   
    price: Number,
    priceBuy:Number,
    imgURL: String,
    imgId : Number,
    description: String,
    caducidad: Date,

});

export default model<Product>('Product', ProductSchema);
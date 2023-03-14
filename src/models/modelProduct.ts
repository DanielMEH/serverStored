import mongoose, { Schema, model } from "mongoose";
import { Product } from "../interfaces/product";
//import autoincrement from "mongoose-auto-increment";

const ProductSchema = new Schema({
  name: { type: String, require: true },
  iva: Number,
  category: String,
  price: Number,
  priceBuy: Number,
  imgURL: { type: String, unique: true, required: true, lowercase: true },
  imgId: Number,
  description: String,
  caducidad: Date,
  tokeIdUser: { type: String, require: true, unique: true },
  
},
{
  timestamps:true
});

export default model<Product>("Product", ProductSchema);

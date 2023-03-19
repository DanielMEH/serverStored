import  { Schema, model } from "mongoose";
import { Product } from "../interfaces/product";
//import autoincrement from "mongoose-auto-increment";

const ProductSchema = new Schema({
  name: { type: String, require: true },
  iva: Number,
  tokenIdUser: { type: String, require: true, unique: true },
  idCategory: String,
  price: Number,
  priceBuy: Number,
  description: String,
  fechaCreacion: String,
  caducidad: Date,
  tokeIdUser: { type: String, require: true, unique: true },
  
},
{
  timestamps:true
});

export default model<Product>("Product", ProductSchema);

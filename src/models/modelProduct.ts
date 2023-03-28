import  { Schema, model } from "mongoose";
import { Product } from "../interfaces/product";
//import autoincrement from "mongoose-auto-increment";

const ProductSchema = new Schema({
  name: { type: String,  },
  iva: Number,
  tokenIdUser: { type: String, require: true},
  category: String,
  price: Number,
  priceBuy: Number,
  description: String,
  fechaInicio: String,
  fechaFin: String,
  
},
{
  timestamps:true
});

export default model<Product>("Product", ProductSchema);

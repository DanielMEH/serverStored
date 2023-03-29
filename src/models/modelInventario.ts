import { Schema, model } from "mongoose";

import {inventory} from "../interfaces/inventoryInterface";

const InventorySchema = new Schema({
    tokeIdUser: { type: String, require: true },
    name_inventory: { type: String, require: true },
    description: { type: String, require: true },
    idCategory: { type: String, require: true },
    idProducto: { type: String, require: true },
    nameProduto: { type: String, require: true },
    price: { type: Number, require: true },
    priceBuy: { type: Number, require: true },

},{
    timestamps:true
})

export default model<inventory>("Inventory", InventorySchema);
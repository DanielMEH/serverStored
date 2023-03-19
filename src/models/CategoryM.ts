import { Schema, model } from "mongoose";

import {category} from "../interfaces/CategoryI";


const CategorySchema = new Schema({
    tokeIdUser: { type: String, require: true },
    name_category: { type: String, require: true },
    description: { type: String, require: true },
    imgURL: { type: String},
    imgId: {type: String },
    
},{
    timestamps:true
})

export default model<category>("Category", CategorySchema);
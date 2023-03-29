import {Schema,model} from 'mongoose';
import {Provider} from '../interfaces/providers';


const providerSchema= new Schema({
    idCategory: {type: String, required: true},
    tokenIdUser: {type: String, required: true},
    name: {type: String, required: true},
    company: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    fecha: {type: String, required: true},
    
},{
    timestamps:true
});

export default model<Provider>('Provider',providerSchema); 
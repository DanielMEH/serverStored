import {Schema,model} from 'mongoose';
import {Provider} from '../interfaces/providers';


const providerSchema= new Schema({
    productIdCategory: {type: String, required: true},
    name: {type: String, required: true},
    company: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    address: {type: String, required: true},
    fecha: {type: String, required: true}
});

export default model<Provider>('Provider',providerSchema); 
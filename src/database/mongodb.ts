import mongoose from 'mongoose'
import { MONGO_URI } from '../config/config';


export const connect = async () => {
    try {
        await mongoose.connect(`${MONGO_URI}`);
        console.log('MONGODB is connected');
    }
    catch (error) {
        console.log(error);
    }
}
    
    


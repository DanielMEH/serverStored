import mongoose from 'mongoose'
import { MONGO_URI_LOCAL , MONGO_URI_ATLAS} from '../config/config';


export const connect = async () => {


    try {
        await mongoose.connect(`${MONGO_URI_ATLAS}`);
        console.log('MONGODB is connected');
    }
    catch (error) {
        console.log(error);
        console.log("Error connecting to MongoDB");
        
    }
    
}
    
    


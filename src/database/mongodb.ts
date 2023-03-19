import mongoose from 'mongoose';
import { MONGO_URI_LOCAL , MONGO_URI_ATLAS} from '../config/config';


export const connect = async () => {


    try {
        await mongoose.connect(`mongodb+srv://storedDJ:stored2023@devstored.djkvb2m.mongodb.net/DevStored?retryWrites=true&w=majority`);
        console.log('MONGODB is connected');
    }
    catch (error) {
        console.log(error);
        console.log("Error connecting to MongoDB");
        
    }
    
}
    
    


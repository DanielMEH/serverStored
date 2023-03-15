import mongoose from 'mongoose';


export interface category extends mongoose.Document{

    tokeIdUser:string,
    name_category: string,
    description: string,
    imgURL: string,
    imgId: number,


}
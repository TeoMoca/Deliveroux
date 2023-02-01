import mongoose from 'mongoose';

export const articles = mongoose.model(
    "articles",
    new mongoose.Schema({
        id_restaurant:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        picture:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        type:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
    })
);


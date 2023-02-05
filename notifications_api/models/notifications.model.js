import mongoose from 'mongoose';

export const notifications = mongoose.model(
    "notifications",
    new mongoose.Schema({
        id_user:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        date:{
            type: Date,
            required: true
        },
        seen:{
            type: Boolean,
            required: true
        },
        route:{
            type:String
        }
    })
);


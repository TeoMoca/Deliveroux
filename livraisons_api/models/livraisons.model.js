import mongoose from 'mongoose';

export const livraisons = mongoose.model(
    "livraisons",
    new mongoose.Schema({
    commandeID : { 
        type: String, 
        required: true 
    },
    livreurID : { 
        type: String, 
        required: true
    },
    livraisonStatut : {
        type : String, 
        required: true
    },
    dateCommandeRecupere : {
        type : Date, 
        required : true
    },
    dateCommandeLivre : {
        type : Date
    }
    })
);
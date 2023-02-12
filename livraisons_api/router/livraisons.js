import  express  from "express";
import mongoose from "mongoose";
import { db } from "../models/index.js";

export const livraisonsRouter = express.Router();


// Routes

livraisonsRouter.get("/service/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });


livraisonsRouter.post("/accept", (req, res) => {
  const commandeID = req.body.commandeID;
  const livreurID = req.body.livreurID;

  checkLivraisonEnCours(livreurID).then((result) => {
    if (result) {
      res.json({ message: "Livreur occupé" });
    } else {
      res.json({ message: "Livreur dispo" });
      const newLivraison = {
        commandeID: commandeID,
        livreurID: livreurID,
        livraisonStatut: "EC",
        dateCommandeRecupere: Date(Date.now),
      };

      console.log(newLivraison);
      db.notifications.insertMany(newLivraison);
    }
  });
});



livraisonsRouter.get("/", (req, res) => {
    db.livraisons
      .find({})
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no livraisons found with this id." });
      });
  });


livraisonsRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    db.livraisons
      .find({id:id})
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no livraisons found with this id." });
      });
  });

  livraisonsRouter.get("/livreur/:idLivreur", (req, res) => {
    const idLivreur = req.params.idLivreur;
    const id = req.params.id;
    db.livraisons
      .find({idLivreur:idLivreur})
      .then((e) => {
        res.status(200).json(e);
      })
      .catch(() => {
        res.status(404).json({ message: "no livraisons found with this id." });
      });
  });

  //LIVRAISON DONE
livraisonsRouter.put("/done/:id", (req, res) => {
    const id = req.params.id;
    //Update etat livraison
    db.livraisons.findOneAndUpdate({_id:id, livraisonStatut: "EC"}, { $set:{ livraisonStatut: "F", dateCommandeLivre: Date(Date.now())} })
    .then(()=>{
        res.status(200).json({message:"Objet modifié"})
    }).catch(e=>{
        res.status(404).json({message:`objet non trouvé`})
        //console.log(articles)
    })
    //Supprime la livraison de Mongo
    //dbLivraison.deleteOne({id:id})
  });

livraisonsRouter.delete("/:id", (req, res) => {
  var id = req.params.id;
    db.menus.findOneAndDelete({_id:id}).then(()=>{
            res.status(200).json({message:"item deleted"});
        }).catch(()=>{
            res.status(404).json({message: 'item not found'});
        })
});

  //--------------------------------------------------------------------
  function checkLivraisonEnCours(livreurID) {
    return db.livraisons
    .find({livraisonStatut: "EC", livreurID: livreurID})
    .then((livraison) => {
        if (livraison.length > 0) {
          return true;
        }
        {
          return false;
        }
      });
  }
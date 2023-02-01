import  express  from "express";
import mongoose from "mongoose";
import { db } from "../models/index.js";


export const catalogsRouter = express.Router();


catalogsRouter.get("/service/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });


catalogsRouter.get("/find/:id", (req, res) => {
var id = req.params.id;
db.menus
  .find({ _id: id })
  .then((menu) => {
    if (menu.length == 0) {
      db.articles.find({ _id: id }).then((article) => {
        if (article.length == 0) {
          res.status(404).json({ message: "not found" });
        } else {
          res.status(200).json(article);
        }
      });
    } else {
      res.status(200).json(menu);
    }
  })
  .catch(() => {
    res.status(404).json({ message: "not found" });
  });
});
  

catalogsRouter.get("/:id_restaurant", (req, res) => {
    let menusList;
    let articlesList;
    db.menus.find({ id_restaurant: req.params.id_restaurant }).then((menus) => {
      menusList = menus;
      db.articles
        .find({ id_restaurant: req.params.id_restaurant })
        .then((e) => {
          articlesList = e;
          res.status(200).json({ menusList, articlesList });
        })
        .catch(() => {
          res.status(404).json({ message: "sensor not found" });
        });
    });
  });






  //-------------------------------------------------------ARTICLES-------------------------------------------------------------------------------------
  catalogsRouter.get("/articles/:id_restaurant", (req,res)=>{
    var idr = req.params.id_restaurant;
    //montrer les menus de la boutique id
    //CLIENT: READ ONLY
    //RESTO: CREATE READ UPDATE DELETE
    db.articles.find({id_restaurant:idr}).then((e)=>{
        res.status(200).json(e);
    }).catch(()=>{
        res.status(404).json({message: 'sensor not found'});
    })
});

catalogsRouter.get("/articles/:id_restaurant/:num_article", (req,res)=>{
    var numa = req.params.num_article;
    db.articles.find({_id:numa}).then((e)=>{
            res.status(200).json(e);
        }).catch(()=>{
            res.status(404).json({message: 'sensor not found'});
        })
});
catalogsRouter.post("/articles/add", (req,res)=>{
    console.log(req.body)
    var newItem = {
        id_restaurant:req.body.id_restaurant,
        name: req.body.name,
        picture:req.body.picture,
        description: req.body.description,
        type:req.body.type,
        price:req.body.price
    }
        //sensors.push(newSensor);
        db.articles.insertMany(newItem).then(()=>{
            res.status(200).json({message:`l'item a bien été ajouté`})
        }).catch(e=>{
            res.status(400).json({message:`error`})
        })
        //console.log(articles)
    
});

catalogsRouter.put("/articles/modify", (req,res)=>{
    console.log(req.body)
    var newItem = {
        _id:req.body._num_article,
        id_restaurant:req.body.id_restaurant,
        name: req.body.name,
        picture:req.body.picture,
        description: req.body.description,
        type:req.body.type,
        price:req.body.price
    }
    db.articles.findOneAndUpdate({_id:newItem._id},{$set:newItem}).then(()=>{
            res.status(200).json({message:"Objet modifié"})
        
    }).catch(e=>{
            res.status(404).json({message:`objet non trouvé`})
            //console.log(articles)
        })
    
});

catalogsRouter.delete("/articles/:id_restaurant/:num_article", (req,res)=>{
    var numa = req.params.num_article;
    db.articles.findOneAndDelete({_id:numa}).then(()=>{
            res.status(200).json({message:"item deleted"});
        }).catch(()=>{
            res.status(404).json({message: 'item not found'});
        })
});
//--------------------------------------------------------------------------------------------------------------------------------




//---------------------------------------------------MENUS-------------------------------------------------------------------------------------
catalogsRouter.post("/menus/add", (req,res)=>{
    console.log(req.body)
    var newMenu = {
        id_restaurant:req.body.id_restaurant,
        picture:req.body.picture,
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        type:"menu",
        articles:req.body.articles
    }
    //sensors.push(newSensor);
    db.menus.insertMany(newMenu).then(()=>{
        res.status(200).json({message:`le menu a bien été ajouté`});
    })
    
});


catalogsRouter.get("/menus/:id_restaurant", (req,res)=>{
    var idr = req.params.id_restaurant;
    //montrer les menus de la boutique id
    //CLIENT: READ ONLY
    //RESTO: CREATE READ UPDATE DELETE
    db.menus.find({id_restaurant:idr}).then((e)=>{
        res.status(200).json(e);
    }).catch(()=>{
        res.status(404).json({message: 'sensor not found'});
    })
});

catalogsRouter.get("/menus/:id_restaurant/:num_menu", (req,res)=>{
    var numm = req.params.num_menu;


    db.menus.find({_id:numm}).then((e)=>{
            res.status(200).json(e);
        }).catch(()=>{
            res.status(404).json({message: 'sensor not found'});
        })
    

    //montrer un menu spécifique de la boutique id
    //CLIENT: READ ONLY
    //RESTO: CREATE READ UPDATE DELETE
});

catalogsRouter.put("/menus/modify", (req,res)=>{
    var newMenu = {
        _id: req.body._id,
        id_restaurant:req.body.id_restaurant,
        picture:req.body.picture,
        name: req.body.name,
        description: req.body.description,
        price:req.body.price,
        type:req.body.type,
        articles:req.body.articles
    }
    db.menus.findOneAndUpdate({_id:newMenu._id},{$set:newMenu}).then(()=>{
            res.status(200).json({message:"Objet modifié"})
        
    }).catch(e=>{
            res.status(404).json({message:`objet non trouvé`})
            //console.log(articles)
        })
    
});

catalogsRouter.delete("/menus/delete/:num_menu", (req,res)=>{
    var numm = req.params.num_menu;
    db.menus.findOneAndDelete({_id:numm}).then(()=>{
            res.status(200).json({message:"item deleted"});
        }).catch(()=>{
            res.status(404).json({message: 'item not found'});
        })
});
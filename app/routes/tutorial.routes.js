module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", tutorials.create);

    //Retrieve
    router.get("/",tutorials.findAll);

    //retrieve all published
    router.get("/published",tutorials.findAllPublished);

    //retrieve a single tutorial with an id
    router.get("/:id",tutorials.findOne);

    //update aTutorial with id
    router.put("/:id",tutorials.update);

    //Delete a Tutorial with id 
    router.delete("/:id",tutorials.delete);

    // delete all new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use('/api/tutorials',router);

};  
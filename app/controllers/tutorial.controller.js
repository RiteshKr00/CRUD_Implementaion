const db =require("../models");
const Tutorial =db.tutorials;
const Op=db.Sequealize.Op;

//create and save a tutorial
exports.create=(req,res)=>{
     // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

//Retrieve all Tutorials from Database.
exports.findAll=(req,res)=>{
   const title=req.query.title;
   var condition =title?{title:{[Op.ilike]: '%${title}%'}}:null;
   
   Tutorial.findAll({where:condition})
   .then(data=>{
     res.send(data);
   })
   .catch(err=>{
     res.status(500).send({
       message:
       err.message ||"some error occured while retrieving ."
     });
   });
};
//find a tutorialwith id
exports.findOne=(req,res)=>{
    const id=req.params.id;

    Tutorial.findbyPK(id)
    .then(data=>{
      res.send(data);
    })
    .catch(err=>{
      res.status(500).send({
        message:"Error retrieving Tutorial with id="+id
      });
    });
};

//Update a tutorial by the id
exports.update =(req,res){
  const id=req.params.id;
  
  Tutorial.update(req.body,{
    where:{id:id}
  })
  .then(num=>{
    if(num==1){
      res.send({
        message:'Cannot update Tutorial with id=${id}.Maybe Tutorial is not  found or req.body is empty!'
      });
    }
  })
  .catch(err=>{
    res.status(500).send({
      message: "Error updating Tutorial with id=" + id
  });
}); 
};
//delete a tutorial using id
exports.delete=(req,res)=>{
    const id = req.params.id;

    Tutorial.destroy({
      where:{id: id}
    })
    .then(num=> {
        if(num==1){
          res.send({
            message: "Tutorial eas deleted successfully!"
          });
        }else{
          res.send({
            message:'Cannot delete Tutorial with id=${id}.Not Found'
          });
        }
      })
      .catch(err=>{
        res.status(500).send({
          message:"Could not delete with id="+id
        });
      });
};
//delete all
exports.deleteAll=(req,res)=>{
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });    
};
//find all published =true
exports.findAllPublished=(req,res)=>{
  Tutorial.findAll({ where: { published: true } })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
};
const express=require("express");
const bodyParser =require("body-parser");
const cors=require("cors");


const app=express();

//configure cors
var corsOptions = {
    origin: "http://localhost:3000"
} ;

app.use(cors(corsOptions));

//parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//sequealize
const db=require("./app/models");
//db.sequelize.sync();
db.sequelize.sync({force:true}).then(()=>{
    console.log("Drop and re-sync db.");
});
//simple route
app.get("/",(req,res)=>{
    res.json({message:"Welcome to learn CrUD Api"});

});
//include routes
require("./app/routes/tutorial.routes")(app);
//set port,listen for requests
const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`);    
});

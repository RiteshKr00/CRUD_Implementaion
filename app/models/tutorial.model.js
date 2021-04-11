const { Sequelize } = require("sequelize");

//this model represent tutorials table in db
module.exports=(sequelize,Sequelize)=>{
    const Tutorial= sequelize.define("tutorial",{
title: {
    type:Sequelize.STRING
},
description: {
    type:Sequelize.STRING
}        ,
published: {
    type:Sequelize.BOOLEAN
}
});
return Tutorial;
};
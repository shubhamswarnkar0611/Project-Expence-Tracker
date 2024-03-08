const Sequelize= require('sequelize');
const sequelize= require('../utils/database');

const Users = sequelize.define("Users",{

    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        
    },    
    name:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    isPremium:Sequelize.BOOLEAN,

    totalSpent:{
        type:Sequelize.INTEGER,
        defaultValue: 0,
        
    },

})

module.exports =Users;
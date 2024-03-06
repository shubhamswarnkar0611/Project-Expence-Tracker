const Sequelize= require('sequelize');
const sequelize= require('../utils/database');

const Expense = sequelize.define("Expense",{

    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        
    },    
    spent:{
        type:Sequelize.STRING,
        allowNull:false,

    },
    description:{
        type:Sequelize.STRING,
        unique:false,
       
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false,
    }

})

module.exports =Expense;
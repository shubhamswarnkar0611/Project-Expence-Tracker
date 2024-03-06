const Sequelize= require('sequelize');
const sequelize= require('../utils/database');

const Order = sequelize.define("Order",{

    id:{
        type:Sequelize.INTEGER,
        unique:true,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
        
    },    
    paymentId: Sequelize.STRING,
    orderId: Sequelize.STRING,
    status: Sequelize.STRING,
      

   
})

module.exports =Order;
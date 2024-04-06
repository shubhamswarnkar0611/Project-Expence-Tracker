require("dotenv").config();

const express = require('express');
const cors = require('cors');
const User = require("./models/usersM")
const Expense=require("./models/expenseM");
const Order=require("./models/orderM")
const ForgotPassword=require("./models/forgotPasswordM")
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersR');
const expenseRouter = require('./routes/expenseR');
const orderRouter = require('./routes/orderR');
const premiumRouter = require('./routes/premiumR');
const forgotPasswordRouter = require('./routes/forgotPasswordR');
const helmet =require("helmet");
const path = require("path");

const sequelize = require('./utils/database');


const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json({extended: false}));




app.use(userRouter);
app.use(expenseRouter);
app.use(orderRouter);
app.use(premiumRouter);
app.use(forgotPasswordRouter);



User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);





sequelize.sync({force:false})
.then(result=>{
    console.log(result)
    app.listen(process.env.DB_PORT || 4000)
})
.catch(err=>console.log(err))
const express = require('express');
const cors = require('cors');
const User = require("./models/usersM")
const Expense=require("./models/expenseM");
const Order=require("./models/orderM")
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersR');
const expenseRouter = require('./routes/expenseR');
const orderRouter = require('./routes/orderR');
const sequelize = require('./utils/database')

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use(userRouter);
app.use(expenseRouter);
app.use(orderRouter)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);




sequelize.sync({force:false})
.then(result=>{
    console.log(result)
    app.listen(4000)
})
.catch(err=>console.log(err))
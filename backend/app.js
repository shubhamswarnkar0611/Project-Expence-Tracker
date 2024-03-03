const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/usersR');
const sequelize = require('./utils/database')

const app = express();

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.use(userRouter);



sequelize.sync({force:false})
.then(result=>{
    console.log(result)
    app.listen(4000)
})
.catch(err=>console.log(err))
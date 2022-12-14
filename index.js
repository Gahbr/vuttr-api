const express = require('express');
const dotenv = require ('dotenv').config();
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
const mongoUrl = process.env.MONGO_URI;
const app = express();
const toolsRoute = require('./routes/toolsRoute');
const authRoute = require('./routes/authRoute');
const Auth = require ('./middleware/auth');
const swaggerFile = require('./swagger_output.json')
const swaggerUI = require('swagger-ui-express');


//swagger
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

//mongo
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//chamando as rotas
app.get('/', (req,res)=>{
    res.send("Seja bem vindo à API da VUTTR (Very Useful Tools to Remember)!");
});

app.use('/auth',authRoute)
app.use('/tools', Auth.private, toolsRoute);

//listener
const listener = app.listen(3000, ()=>{
    console.log("Aplicativo rodando no endereço:  http://localhost:" + listener.address().port );
})
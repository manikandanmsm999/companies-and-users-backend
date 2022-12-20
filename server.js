const express=require('express');
var bodyParser = require('body-parser');
const route=require('./Routes/routing');
const errorLogger=require('./Utilities/errorLogger');
const requestLogger=require('./Utilities/requestLogger');

const app=express();
app.use(bodyParser.json());
app.use(requestLogger);
app.use('/',route);
app.use(errorLogger);

const port=3030;

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});

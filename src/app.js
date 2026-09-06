const express = require('express');
const cors = require('cors');
const app = express();

//Middelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

module.exports=app;

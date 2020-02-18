const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();



router.get('/login',(req,res,next)=>{
    
    res.send('login');
});

app.use(bodyParser.json());
app.use(cors());

module.exports = router ;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser');

router.get('/admin',(req,res,next)=>{
    
    res.send('Index page');
});
module.exports = router ;

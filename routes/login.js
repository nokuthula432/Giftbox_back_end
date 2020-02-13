const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');

router.get('/login',(req,res,next)=>{
    
    res.send('login');
});


module.exports = router ;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  mysqlConn= require('../conn/conn')

router.post('/index',function(req,res){
    res.send('index');
});

module.exports = router ;
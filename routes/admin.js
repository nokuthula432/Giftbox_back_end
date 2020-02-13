const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');

router.post('/admin',function(req,res){
    res.send('admin');
});

module.exports = router ;

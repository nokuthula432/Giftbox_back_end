const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser');

<<<<<<< HEAD
router.post('/admin',function(req,res){
    res.send('admin');
});

=======
router.get('/admin',(req,res,next)=>{
    
    res.send('Index page');
});
>>>>>>> origin/lindo
module.exports = router ;

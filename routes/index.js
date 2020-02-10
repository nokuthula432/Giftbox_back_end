const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  mysqlConn= require('../conn/conn')


router.get('/admin', function(req,res){

    const username = req.body.username;
    
    var myQuery = "SELECT * FROM admin WHERE username = ?";

    mysqlConn.query(myQuery, [username], function(err, results){
        if(err){
            res.send({
                code: 400,
                message: err
            })
        }
        else{

            console.log("results")
            res.send({
                data: results,
                code: 200,
                message: "Successful..."
            })
        }
    })
});

module.exports = router ;
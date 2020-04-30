const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  mysqlConn= require('../conn/conn');
const bodyparser = require('body-parser')

//searching  for categories using like % vale % "working"
router.get('/searchCat', function(req,res){

    var lastname = req.body.lastname;
    var myQuery = "SELECT * FROM tbluser WHERE lastname LIKE '%" + lastname + "%' ORDER BY  lastname DESC LIMIT 4";

    mysqlConn.query(myQuery,lastname, function(err,results){
        if(err){
            res.send(err)
        }
        else{
            console.log(results)
             res.send({
                data: results,
                message: "Search - Successful..."
                
            }) 
        }
    })
});

//dropbox search "working"
router.get('/searchDropbox', function(req,res){

    var lastname = req.body.lastname;
    var myQuery = "SELECT * FROM tbluser WHERE lastname = ?";

    mysqlConn.query(myQuery,lastname, function(err,results){
        if(err){
            res.send(err)
        }
        else{
           console.log(results)
           res.send({
                data: results,
                message: "DROPBOX successfully...selected the category"
            }) 
        }
    })
});
router.get('/getWish', function(req,res){

    var cust_num = req.body.cust_num;
    var myQuery = "SELECT * FROM wishlist WHERE cust_num = ? ";

    mysqlConn.query(myQuery,cust_num, function(err,results){
        if(err){
            res.send("wish selection ,not successful")
        }
        else{
            console.log(results)
             res.send({
                data: results,
                message: "wish selection  - Successful..."
                
            }) 
        }
    })
});
module.exports = router;
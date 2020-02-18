const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();
const mysql = require('mysql');
const  mysqlConn= require('../conn/conn');
const bodyparser = require('body-parser')

//searching for categories
router.get('/cat', function(req,res){

    //const username = req.body.username;
    //var myQuery = "SELECT * FROM admin WHERE username = ?";

    const category = req.body.category;
    var myQuery = "SELECT * FROM tblstudentaccount WHERE fk_studentNumber like '%c%' ";

    mysqlConn.query(myQuery, [category], function(err,results){
        if(err){
            res.send({
                data : results,
                code : 200,
                message : "Sorry, item already exist in the cart just add qty!"

            })

           console.log("results")
           res.send({
                data: results,
                code: 200,
                message: "Successful..."
            }) 
          
        }
        
    })
});

//selecting from a dropbox
router.get('/categories', function(req,res){

        const category = req.body.category;

        mysqlConn.query("SELECT * FROM tblstudentaccount WHERE fk_studentNumber = ?",[category],function(err,results){
        if(err){
            console.log(err);
        }
        else{
          
            //return req.send({results})
            console.log(results);
            res.send({
                data: results,
                message: "Successful..."
            }) 
            
        }
    });
});

// delete first option
router.delete('/than/:id',(req,res)=>{
    mysqlConn.query('DELETE FROM tbluser WHERE user_id = ?',[req.params.id],(err,rows)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    }) 
});

// delete second option
router.delete('/del',(req,res)=>{

     var user_id = req.body.user_id;

    mysqlConn.query("DELETE FROM tbluser WHERE user_id = ?",[user_id],(err)=>{
        if(!err)
            //res.send({results}),
            res.send('Deleted successfully');

        else
            console.log(err);
    }) 
});


module.exports = router;


const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sqlconn=require('../conn/conn');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


router.post ('/d', function(req,res){

 let name = {fullName:req.body.fullName,email:req.body.email,phoneNo:req.body.phoneNo,address:req.body.address,city:req.body.city,province:req.body.province,code:req.body.code}
      
        sqlconn.query("INSERT INTO orders set ?",name, function(error, results) {
        if (error) throw error;
 
        else
                    
        res.send( {message:'user sucessfully  place an order'})
      
      });
  const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const sqlconn=require('../conn/conn');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


router.post ('/d', function(req,res){

 let name = {fullName:req.body.fullName,email:req.body.email,phoneNo:req.body.phoneNo,address:req.body.address,city:req.body.city,province:req.body.province,code:req.body.code}
      
        sqlconn.query("INSERT INTO orders set ?",name, function(error, results) {
        if (error) throw error;
 
        else
                    
        res.send( {message:'user sucessfully  place an order'})
      
      });
  
 })


 router.get ('/allOrders', function(req,res){
       
         sqlconn.query("select * from orders", function(error, results) {
         if (error) throw error; 
         else                     
         res.send( {data:results})      
       });  
  })

  //Delete an seller
router.delete('/t/:fullName',(req,res)=>{
  sqlconn.query('DELETE FROM orders WHERE fullName = ?',[req.params.fullName],(err,rows,fields)=>{
      if(!err)
          res.send('Deleted successfully');
      else
          console.log(err);
  })
  
});



    
 })


 router.get ('/allOrders', function(req,res){
       
         sqlconn.query("select * from orders", function(error, results) {
         if (error) throw error; 
         else                     
         res.send( {data:results})      
       });  
  })

  //Delete an seller
router.delete('/t/:fullName',(req,res)=>{
  sqlconn.query('DELETE FROM orders WHERE fullName = ?',[req.params.fullName],(err,rows,fields)=>{
      if(!err)
          res.send('Deleted successfully');
      else
          console.log(err);
  })
  
});

  
module.exports=router;

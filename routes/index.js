const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.json());
app.use(cors());


router.post('/update',function(req,res){
  var name = req.body.name;
  var qty = req.body.qty ;
  var total = req.body.total;
  var price = req.body.price;
  var quantity = req.body.quantity;
  var description = req.body.description;
  
  //Udate qty
  var sql="UPDATE cart_det SET qty = ? WHERE name = ? " ;
  db.query(sql,[qty,name] ,function (err, results,fields){
      if(!err){
                  
                  res.send(results)
              }else{
                  console.log(err)
              }
   });
  
   router.post('/addOrder',function(req,res){

    var name = "SELECT `name`  FROM `cart_det`";
    var qty = "SELECT `qty`  FROM `cart_det`";
    var price = "SELECT `price`  FROM `cart_det`";
    var description = "SELECT `description`  FROM `cart_det`";

//     Add to orders
   var sqlP =('INSERT INTO `orders`(`name`, `price`, `description`, `qty`) VALUES (?,?,?,?)');
  db.query(sqlP,[name, price, description, qty] ,function (err, results){
          if(!err){
             res.send({data:results});             
    
          }
          else{
            console.log(err);
          }
        })   

});
})
module.exports = router;

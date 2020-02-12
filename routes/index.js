const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();


app.use(bodyParser.json());
app.use(cors());

router.post('/add', (req, res) =>
{ 
//   var name = req.body.name;
//   var qty = req.body.qty ;
  
//   var sql="UPDATE menu SET qty = ? WHERE name = ? " ;
//   connection.query(sql,[qty,name] ,function ( results,fields){  });
//   connection.query('SELECT name, price, description, qty ,(price * qty) AS TOTAL_PRICE  FROM menu WHERE name = ?',[name], function (err, results,fields)
//   {
//   res.send(results)
//     var price1
//     price1 = (results[0].price * qty); 

    var post = "INSERT INTO cart  (productId, productName,itemId) VALUES (?,?,?,?)";
    mysqlConn.query(ipost,[results[0].id,results[0].pName,results[0].itemId],function ( rows,fields,err, result){
    if(err) {
    console.log(" Your order was Placed successfully");
    }else{
      res.send({status:200});
         }
    }) 

})












router.get('/view', (req, res) => {

    

    var sql = "select * from cart";
    
    mysqlConn.query(sql, function (err, result,fields) {
      if (!err)
      res.send({data:result})
      else
      console.log(err);
    
    
    })
});




module.exports = router ;

const mysql = require('mysql');
const express = require('express');



const mysqlConn =mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
<<<<<<< HEAD
  database:'giftbox',
=======
  database:'studentportal',
>>>>>>> origin/lindo
  multipleStatements: true

})


mysqlConn.connect((err)  =>{

if(!err)

console.log('db connection succeed');


else


console.log('db connection failed');


});


module.exports =mysqlConn;

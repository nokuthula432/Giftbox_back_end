const mysql = require('mysql');
const express = require('express');



const mysqlConn =mysql.createConnection({

  host:'localhost',
  user:'root',
  password:'',
  database:'giftbox',
  multipleStatements: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }

})


mysqlConn.connect((err)  =>{

if(!err)

console.log('db connection succeed');


else


console.log('db connection failed');


});


module.exports =mysqlConn;

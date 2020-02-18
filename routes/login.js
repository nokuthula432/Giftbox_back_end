const mysql = require('mysql');
const express = require('express');
const app = express();
var cors = require('cors')
const mysqlConn= require('../conn/conn');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/api',(req,res)=>{

	res.json({message:'welcome to the api'});
  });

  router.post('/apip',(req,res)=>{
	res.json({message: 'post created...'});
   });

   router.post('/apiL',(req,res)=>{
	const user ={
	  fullName :'zamo', 
	  email: 'zamo@gmail.com'
  
	}
	jwt.sign({user},'secretkey',(err,token)=>{
		res.json({
		  token
		});
	  });

	});
	

module.exports = router ;

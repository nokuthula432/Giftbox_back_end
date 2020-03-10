const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const  db = require('../conn/conn');
const bodyparser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');


//Get all product
router.get('/than',(req,res)=>{
    db.query('SELECT * FROM product',(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Get a product
router.get('/thans',(req,res)=>{
    db.query('SELECT * FROM product WHERE product_category =?',[req.body.product_category],(err,rows,fields)=>{
        if(!err)
            res.send(rows);
        else
            console.log(err);
    })
    
});

//Delete product
router.delete('/thand',(req,res)=>{
    db.query('DELETE FROM product WHERE product_name = ?',[req.body.product_name],(err,rows,fields)=>{
        if(!err)
            res.send('Deleted successfully');
        else
            console.log(err);
    })
    
});

//Insert an product


router.post ('/d', function(req,res){

    let name = {product_id:req.body.product_id,product_name:req.body.product_name,product_price:req.body.product_price,product_category:req.body.product_category,product_desc:req.body.product_desc,picture_path:req.body.picture_path}
         
          db.query("INSERT INTO product set ?",name, function(error, results) {
           if (error) throw error;
    
           else
                       
           res.send( {message:' sucessfully '})
         
         });
     
    })

//Udate product
    router.put('/updateA', function(req,res){
   
        var product_price = req.body.product_price;
        var product_name = req.body.product_name;
      
    
        var myQuery ="UPDATE product SET product_price = '" + product_price+  "' WHERE product_name = '" + product_name + "'";
    
        db.query(myQuery,[product_price,product_name], function(err,results){
            if(err){
                res.send(err)
            }
            else{
                console.log(results)
                 res.send({
                    data: results,
                    message: "Update - Successful..."   
                }) 
            }
        })
    });
    //searching  for categories using like % value % "working admin search (just changes of variables)"
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
                message: "Search - Successful...",
                
            }) 
        }
    })
});

//dropbox search "working for admin if needed "
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

//uploading a docment into a folder(directory) and into the database MYSQL "WORKING"
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, "./upload"));
    },
            filename: function(req,file,cb){
            cb(null,file.originalname);
    }
});

 // rejects a file
const fileFilter = (req, file, cb) => {
   
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    console.log("wrong document");
    }
  };

const upload = multer({
    storage:storage,
    limits:{
            fileSize: 1022 * 1022 * 4
    },
    fileFilter: fileFilter
});


router.post('/upload2',upload.single('document'),(req,res)=>{
    
    document = req.file.path; 

    if (document) {
        mysqlConn.query("INSERT INTO upload(upload_id, document) VALUES ('','"+ document + "')", [document], function(err,results){
            if (err) {
                res.send("upload document - failed.........file not received");  
            }
            else{
                return res.send({results,
                  message: "document upload - successful!!! --file received"})
            }
            }) 
    } else {
        res.send("PLEASE UPLOAD YOUR DOCUMENT");
    } ;
});

//retrieving the path from the database and getting the picture


router.get('/download', function(req,res,next){

     filepath = path.join(__dirname,'./upload/')+req.body.file;
     return res.sendFile(filepath);
})



module.exports = router ;

// Communication with Database & Response to 

const { response } = require('express');
const express= require('express')
const router = express.Router();
const Product = require('../models/products')

const mongoose =require('mongoose')

//Upload file
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/products')      
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+".jpg") // เปลี่ยนชื่อไฟล์ ป้องกันชื่อซ้ำกัน
    }
})

//Start Upload
const upload = multer({
    storage:storage
})

//Home page
router.get('/',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('index.ejs',{products:doc}) // to render view / template
    })
})

//Form Add
router.get('/addForm',(req,res)=>{
    const products = [
        {name: "Computer",price:50000,image:"images/products/product1.png"},
        {name: "Shirt",price:200,image:"images/products/product2.png"},
        {name: "Headphone",price:1700,image:"images/products/product3.png"}
    ]
    res.render('form',{products:products}) // to render view / template
})

//Form Manage
router.get('/manage',(req,res)=>{
    Product.find().exec((err,doc)=>{
        res.render('manage.ejs',{products:doc}) // to render view / template
    })
})

//Insert product
router.post('/insert',upload.single("image"),(req,res)=>{
    console.log(req.file);
    let data = new Product({
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description   
    })
    Product.saveProduct(data,(err)=>{
        if(err)console.log(err)
        res.redirect('/')
    })
})

module.exports=router
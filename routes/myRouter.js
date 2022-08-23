// Communication with Database & Response to 

const express= require('express')
const router = express.Router();

//Home page
router.get('/',(req,res)=>{
    const name = "kongraksiam ####"
    const age =10
    const address = "<h1> Thailand </h1>"
    const products = [
        {name: "Computer",price:50000,image:"images/products/product1.png"},
        {name: "Shirt",price:200,image:"images/products/product2.png"},
        {name: "Headphone",price:1700,image:"images/products/product3.png"}
    ]
    res.render('index.ejs',{products:products}) // to render view / template
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
    const products = [
        {name: "Computer",price:50000,image:"images/products/product1.png",description:"aa"},
        {name: "Shirt",price:200,image:"images/products/product2.png",description:"aa"},
        {name: "Headphone",price:1700,image:"images/products/product3.png",description:"aa"}
    ]
    res.render('manage',{products:products})
})

//Insert product
router.get('/insert',(req,res)=>{
    console.log(req.query.name)
})


//const path = require('path')

module.exports=router
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
        //console.log("this is product",doc)
        res.render('index.ejs',{products:doc}) // to render view / template
    })
})

//Form Add
router.get('/addForm',(req,res)=>{
    // if(req.cookies.login){
    //     res.render('form')
    // }else{
    //     res.render('admin')
    // }
    // res.render('admin') // to render view / template

    if(req.session.login){
        res.render('form')
    }
    else{
        res.render('admin')
    }
})

//Form Manage
router.get('/manage',(req,res)=>{
    // if(req.cookies.login){
    //     Product.find().exec((err,doc)=>{
    //         res.render('manage.ejs',{products:doc}) // to render view / template
    //     })
    // }
    // else{
    //     res.render('admin')
    // }

    //Show data in session
    console.log('Session >> ', req.sessionID)
    console.log('Data Session >> ', req.session)
    if(req.session.login)
    {
        Product.find().exec((err,doc)=>{
            res.render('manage',{products:doc})
        })
    }
    else{
        res.render('admin')
    }
})

//Login
router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const timeExpire = 20000 //20 s

    // Setting Cookie
    // console.log('username >>', username)
    // console.log('password >>', password)
    
    // if(username ==="admin" && password ==="123"){
    //     res.cookie('username',username,{maxAge:timeExpire})
    //     res.cookie('password',password,{maxAge:timeExpire})
    //     res.cookie('login',true,{maxAge:timeExpire}) // true => login เข้าสู่ระบบ
    //     res.redirect('/manage')
    // }
    // else{
    //     res.render('404')
    // }

        
    if(username ==="admin" && password ==="123"){
        req.session.username = username
        req.session.password = password
        req.session.login = true
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage')

    }
    else{
        res.render('404')
    }
})

//Logout
router.get('/logout',(req,res)=>{
    // res.clearCookie('username')
    // res.clearCookie('password')
    // res.clearCookie('login')
    // res.redirect('/manage')

    req.session.destroy((err)=>{
        res.redirect('/manage')
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

//Delete product
router.get('/delete/:id',(req,res)=>{
    console.log("Delete id >>" ,req.params.id)
    Product.findByIdAndDelete(req.params.id,{useFindAndModify:false}).exec(err=>{
        if(err) console.log(err)
        res.redirect('/manage')
    })
})

router.get('/:id',(req,res)=>{
    const product_id = req.params.id
    //console.log(product_id)
    Product.findOne({_id:product_id}).exec((err,doc)=>{
        res.render('product',{product:doc})
    })
})

//Edit
router.post('/Edit',(req,res)=>{
    const edit_id = req.body.edit_id
    console.log(edit_id)
    Product.findOne({_id:edit_id}).exec((err,doc)=>{
        //Bring that want to edit to show in form
        res.render('edit',{product:doc})
    })
})

//update
router.post('/update',(req,res)=>{
    const update_id = req.body.update_id
    let data = {
        name:req.body.name,
        price:req.body.price,
        description:req.body.description
    }
     Product.findByIdAndUpdate(update_id,data,{useFindAndModify:false}).exec(err=>{
         res.redirect('/manage')
     })
    console.log("update id >> ", update_id)
    console.log("New data", data)

})

//


module.exports=router
const express = require('express')
const path = require('path')
const router=require('./routes/myRouter')
const mongoose = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.set('views',path.join(__dirname,'views')) // file location
app.set('view engine','ejs') // setting template engine

app.use(cookieParser())
app.use(session({secret:"mysession", resave:false,saveUninitialized:false}))
app.use(express.urlencoded({extende:false}))
app.use(router)
app.use(express.static(path.join(__dirname,'public'))) // Can change

app.listen(8080,()=>{
    console.log('Server start at port 8080 . . .')
})
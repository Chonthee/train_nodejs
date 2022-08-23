const express = require('express')
const path = require('path')
const router=require('./routes/myRouter')
const app = express()

app.set('views',path.join(__dirname,'views')) // file location
app.set('view engine','ejs') // setting template engine
app.use(router)

//goto index html only
app.use(express.static(path.join(__dirname,'public'))) // Can change

app.listen(8080,()=>{
    console.log('Server start at port 8080 . . .')
})
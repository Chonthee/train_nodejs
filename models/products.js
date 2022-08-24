// 1. use mongoose
const mongoose =require('mongoose')

// 2. connect to MongoDB
const dbURL = 'mongodb://localhost:27017/productDB'
mongoose.connect(dbURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).catch(err=>console.log(err));

// 3. Design Schema
let productSchema = mongoose.Schema({
    name:String,
    price:Number,
    image:String,
    description:String
})

// 4. Create Model
let Product = mongoose.model("products",productSchema)

// 5. Export Model
module.exports = Product

// Design func for record data
module.exports.saveProduct=function(model,data){
    model.save(data)
}
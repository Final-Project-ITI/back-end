const express = require('express')

const app = express()
const mainRouter=express.Router()

const port = 3000

const database = require("./database/database");
database();

const cartRouter =require ("./routes/cart.js")

const CartService= require("./services/cart.js");

const cartService=new CartService()

const CartController= require("./controllers/cart.js");

const cartController= new CartController(cartService);

mainRouter.use("/api/v1/cart",cartRouter(cartController))

app.use('/', mainRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
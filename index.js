const express=require("express")
require('dotenv').config()
const {connection}=require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { restRouter } = require("./routes/restaurant.routes")
const { orderRouter } = require("./routes/order.routes")
const app=express()

app.use(express.json())
app.use("/api",userRouter)
app.use("/api",restRouter)
app.use("/api",orderRouter)

app.use("/",(req,res)=>{
  res.send("Food Delivery App")
})

app.listen(process.env.port,async(req,res)=>{
    try{
      await connection;
      console.log("connected to db")
    }catch(err)
    {
      console.log("Error in connection the database")
      console.log(err.message)
    }
    console.log(`server is running at port ${process.env.PORT}`)
})
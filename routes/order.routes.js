const express=require("express")
const {OrderModel}=require("../models/order.model")

const orderRouter=express.Router()
 orderRouter.get("/orders/:id",async(req,res)=>{
    try{
        let id=req.params.id

        const orders= await OrderModel.findById(id)
        res.status(200).send(orders)

    }catch(err)
    {
        console.log(err)
    }

})

 orderRouter.patch("/orders/:id",async(req,res)=>{
    try{
        let id=req.params.id
        const data=req.body

        const orders= await OrderModel.findByIdAndUpdate(data)
        res.status(200).send(orders)

    }catch(err)
    {
        console.log(err)
    }

})

module.exports={
    orderRouter
}
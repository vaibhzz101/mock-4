const express=require("express")
const {RestroModel}=require('../models/restaurant.model')

const restRouter=express.Router()

restRouter.post("/add",async(req,res)=>{
    try{
      const payload=req.body
      const restro=new RestroModel(payload)
      await restro.save();

      res.send("restro added")
    }catch(err)
    {
        console.log(err)
    }
})


restRouter.get("/get",async(req,res)=>{
    try{
        const restro= await RestroModel.find()
        res.status(200).send(restro)

    }catch(err)
    {
        console.log(err)
    }
})


restRouter.get("/get/:id",async(req,res)=>{
    try{
        let id=req.params.id

        const restro= await RestroModel.findById(id)
        res.status(200).send(restro)

    }catch(err)
    {
        console.log(err)
    }

})



restRouter.get("/api/restaurants/:id/menu",async(req,res)=>{
    try{
        const {id}=req.params;
        const restro=await RestroModel.findById(id);
        if(!restro)
        {
            res.status(404).send("error while sepecific restro")
        }
        res.status(200).json(restro.menu);

    }catch(err)
    {
        console.log(err)
    }
})

//add specific

restRouter.post("/api/restaurants/:id/menu",async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,description,price,image}=req.body;
        const restro=await RestroModel.findById(id)

        const newrestro={name,description,price,image}
        restro.menu.push(newrestro);
        await restro.save();
        res.status(201).send(" restr updated/added")
    }catch(err)
    {
     console.log(err)
    }
})


//delete speci

restRouter.delete("/api/restaurants/:restroid/menu/:itemid",async(req,res)=>{
    try{  
         
        const {restroid,itemid}=req.params;
        const restro=await RestroModel.findById(restroid)

        const menuitm=restro.menu.id(itemid);

        menuitm.remove();
        await restro.save();

        res.status(202).send(restro)
    }catch(err)
    {
        console.log(err)
    }
})
module.exports={
    restRouter
}
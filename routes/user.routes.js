const express=require("express")
const {UserModel}=require("../models/user.model")
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken")
const userRouter=express.Router()

//regiseter the user
userRouter.post("/register",async(req,res)=>{
    try{
       const payload=req.body;

            const haspass=await bcrypt.hashSync(payload.password,8)
            payload.password=haspass;
     
            const newuser=new UserModel(payload)
            await newuser.save()
            res.status(200).send("User register")
        
      
    }catch(err){
        console.log(err.message)
        res.send(err)
    }
})


userRouter.post("/login",async(req,res)=>{
    try{
        const payload=req.body;
        const user= await UserModel.findOne({email:payload.email});
        
        if(!user)
        {
           res.status(400).send({msg:"please register"})
        }

        const ispasscorr=await bcrypt.compareSync(
            payload.password,
            user.password
        )

        if(ispasscorr)
        {
            const token=await jwt.sign({email:user.email,userid:user._id},"masai")

            res.status(200).send({"msg":"login sucsess","token":token})

        }
        else{
            res.status(400).send({"msg":"wrong pass"})
        }

    }catch{
        console.log("error while login")
    }
})


userRouter.put("/:id/reset",async(req,res)=>{
    try{
      const {id}=req.params;
      const {currentpassword,resetpassword}=req.body;

      const user=await UserModel.findById(id)

      if(!user)
      {
        res.status(401).send("error")
      }

      const ispassvalid=bcrypt.compareSync(currentpassword,user.password)

      if(!ispassvalid)
      {
        res.status(401).send("Password is not valid")
      }

      const hashpass=await bcrypt.hashSync(resetpassword,6)
      user.password=hashpass
      await user.save();

      res.status(200).send("Password reset success")

    }catch(err)
    {
        console.log(err)
    }
})


module.exports={
    userRouter
}

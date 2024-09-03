const express=require('express');

const router=express.Router();


router.post('/',(req,res,next)=>{
    console.log("reqvest")
   res.send({msg:'done'})
})

module.exports=router;
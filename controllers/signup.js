
const { where } = require('sequelize');

const { models: { Emp } } = require('../module');
const { response } = require('express');
module.exports = {

   

   SIGNUP: async (req, res, next) => {
      const data = req.body;

      if (!data.Fname || !data.Lname || !data.sysNo || !data.mobileNo || !data.userName || !data.password||!data.nic|| !data.type) {
        console.log(data)
         res.status(202).send({ msg: 'Enter All data' })
      } else {
         console.log(data)
         try {
            const [employee, created] = await Emp.findOrCreate({
               where: {
                  system_id: data.sysNo
               },
               defaults: {
                  system_id: data.sysNo,
                  nic: data.nic,
                  F_name: data.Fname,
                  L_name: data.Lname,
                  mobile_no: data.mobileNo,
                  user_name: data.userName,
                  password: data.password,
                  status: 0,
                  type:data.type
               }
            });

            if (created) {
               console.log(created);
               res.status(200).send({ data:employee });
            } else {
               console.log(created);
               res.status(303).send({ msg: 'User already registered' });
            }
         } catch (error) {

            res.status(400).send({ msg: error.message });
         }


      }
   },

   LOGIN: async (req, res, next) => {
      const data = req.body;

      if (!data.un || !data.pw) {
         res.status(303).send({ msg: 'Enter All data' })
      } else {
       

   try {

      const employee= await Emp.findOne({
         where:{user_name:data.un}
      })
console.log(employee)

      if(employee===null){
         res.status(400).send("user not found");
      }else{
         if(data.pw===employee.password){
            res.status(200).send({ data:employee });
          }else{
            res.status(204).send("username and password dos't match");
          }
       
      }

} catch (error) {
   res.status(303).send(error.message)
}
      }
   },


CHANGEPASSWORD:async(req,res,next)=>{
const data=req.body;


if(data.newPassward){
try {
  const update= await Emp.update(
      { password: data.newPassward },
      {
        where: {
          id: data.id,
        },
      },
    );

    if (update) {
      res.status(200).send({msg:"updated"});
    } else {
      res.status(300).send({msg:"cannot updTE"});
    }

} catch (error) {
   res.status(400).send(error.message);
}



}else{
   res.status(400).send("no data");
}
   },
   PENDINGACCOUNTS:async(req,res,next)=>{
   let search={}

   const status=req.query.status;
   const all=req.query.all;
   const nic=req.query.nic;
console.log(status)

   if(req.query.status){
   if(req.query.status==='true'){
     search={
      status:true
     }
   }else{
      search={
         status:false
        }
   }
   }else if(all){
      search={}
   }else if(nic){
      search={
         nic:req.query.nic
      }
   }

   console.log(search)
      try {

         const employee= await Emp.findAll({
            where:search
         })
 
         if(employee===null){
            res.status(400).send("user not found");
         }else{
          
               res.status(200).send({ data:employee });
        
          
         }
   
   } catch (error) {
      res.status(303).send(error.message)
   }
      
   },
   APPREVEACCOUNT:async(req,res,next)=>{
      let accId=req.query.id;
      if(accId){
      try {
        
        if(accId){
         await Emp.update(
             { status: true },
             {
               where: {
                 id: accId,
               },
             },
           ).then(data=>{
             if(data){
                 res.status(200).send({ data });
             }
           })
        }else{

        }
     } catch (error) {
         res.status(400).send({ msg: error.message });
     }
   }
},
REJECTACCOUNT:async(req,res,next)=>{
   let accId=req.query.id;
   if(accId){
   try {
     
     if(accId){
      await Emp.update(
          { status: false },
          {
            where: {
              id: accId,
            },
          },
        ).then(data=>{
          if(data){
              res.status(200).send({ data });
          }
        })
     }else{

     }
  } catch (error) {
      res.status(400).send({ msg: error.message });
  }
}
}

   


}




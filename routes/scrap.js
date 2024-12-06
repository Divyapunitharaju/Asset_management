const express=require('express')
const route=express.Router()
const Asset=require('../model/asset')
const AssetHistory=require('../model/assetHistory')




route.get('/',async(req,res)=>{
   const assets=await Asset.findAll({where:{status:['Available','Issued']}})
   res.render('scrap',{assets})
})

route.post('/',async(req,res)=>{
   const {assetId,reason}=req.body

   await Asset.update({status:"Obsolete"},{where:{id:assetId}})


   await AssetHistory.create({
      assetId:assetId,
      employeeId:null,
      action:"Obsolete",
      date:new Date()
   })
   res.redirect('/scrap')
})

module.exports=route
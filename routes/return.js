const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const AssetHistory=require('../model/assetHistory')


route.get('/',async(req,res)=>{
   const issueAsset=await Asset.findAll({where:{status:"Issued"}})
   res.render('return',{issueAsset})
})



route.post('/',async(req,res)=>{
    const {assetId,reason}=req.body

    await Asset.update({status:'Available'},{where:{id:assetId}})

    await AssetHistory.create({
        assetId,
        employeeId:null,
        action:"Returned",
        reason:reason,
        date:new Date()
    })
   res.redirect('/return')
})

module.exports=route;
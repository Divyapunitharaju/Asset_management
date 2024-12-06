const express=require('express')
const route=express.Router()

const AssetCategory=require('../model/assetCategory')

route.post('/',async(req,res)=>{
     const {name}=req.body
     try{
        const assetCategory=await AssetCategory.create({name})
        res.redirect('/assetCategories')
     }catch{
         console.error(err);
         res.json({message:"Error"})
     }
     
})

route.get('/',async(req,res)=>{
    try{
        const assetCategories=await AssetCategory.findAll()
        res.render('AssetCategory/assetCategory',{assetCategories})
    }
    catch{
        console.error(err);
        res.json({message:"Error"})
    }
    

})


route.get('/add',(req,res)=>{
    res.render('AssetCategory/assetCategoryAdd')
})

route.get('/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const assetCategory=await AssetCategory.findByPk(id)
        res.json(assetCategory)
    }
    catch{
        console.error(err);
        res.json({message:"Error"})
    }
   
})

route.put('/:id',async(req,res)=>{
    const {id}=req.params
    const {name}=req.body
    try{
        const assetCategory=await AssetCategory.findByPk(id)
        if(assetCategory)
        {
          const AssetUpdate=  await assetCategory.update({name})
          res.redirect('/assetCategories')
        }
    }
    catch{
        console.error(err);
        res.json({message:"Error"})
    }
})

route.get('/edit/:id',async(req,res)=>{
    const {id}=req.params
    try{
        const assetCategory=await AssetCategory.findByPk(id)
        if(assetCategory)
        {
          res.render('AssetCategory/assetCategoryEdit',{assetCategory})
        }
    }
    catch{
        console.error(err);
        res.json({message:"Error"})
    } 
})


module.exports=route



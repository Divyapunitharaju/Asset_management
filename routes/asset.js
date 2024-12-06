// const express = require('express');
// const route = express.Router();
// const Asset = require('../model/asset');
// const { Op } = require('sequelize');

// route.post('/',async(req,res)=>{
//     const {serialNo,name,model,make,status, branch, value}=req.body;
//     try{
//        const asset=await Asset.create({serialNo,name,model,make,status, branch, value})
//        res.redirect('/')
//     }catch{
//          res.json("Error")
//     }
// })

// route.get('/',async(req,res)=>{
//     const {name,search,make,model}=req.query
//     try{
//        const whereclause={}
//        if(name) whereclause.name=name
//        if(model) whereclause.model={[Op.iLike ]: `%${search}%`}
//        if(make) whereclause.make={[Op.iLike]:`%${search}%`}

//        const assets=await Asset.findAll({where:whereclause})
//        res.render('Asset/asset',{assets})
//     }
//     catch{
//         res.json("Error") 
//     }
// })

// route.get('/add', (req, res) => {
//     res.render('Asset/assetAdd'); 
//   });
  
// route.put('/:id',async(req,res)=>{
//     const {id}=req.params
//     const{serialNo,name,model,make,status, branch, value}=req.body
//     try{
//      const asset=await Asset.findByPk(id)
//      if(asset){
//         const updateAsset=await asset.update({serialNo,name,model,make,status, branch, value})
//         res.json(updateAsset)
//      }
//      else{
//         res.json("Asset not found")
//      }
//     }
//     catch{
//         res.json("Error")
//     }
// })

// module.exports = route;

const express = require('express')
const route = express.Router()
const Asset = require('../model/asset') 
const { Op } = require('sequelize')


route.post('/',async(req, res) => {
    const {serialNo,name,model,make,status,branch,value } = req.body
    try {
        const asset = await Asset.create({ serialNo,name,model,make,status,branch,value})
        res.redirect('/assets');
    } catch (err) {
        console.error(err);
        res.json({ error: 'Error creating asset' });
    }
});


route.get('/',async(req, res) => {
    const { name,search,make,model} = req.query;
    try {
        const whereClause = {};
        if (name) whereClause.name = name;
        if (model) whereClause.model = { [Op.iLike]: `%${model}%` };
        if (make) whereClause.make = { [Op.iLike]: `%${make}%` };

        const assets = await Asset.findAll({ where: whereClause });
        res.render('Asset/asset', { assets });
    } catch (err) {
        console.error(err);
        res.json({error: 'Error fetching assets'});
    }
});


route.get('/add',(req, res) => {
    res.render('Asset/assetAdd');
});


route.get('/edit/:id',async(req,res) => {
    const {id} = req.params;
    try {
        const asset = await Asset.findByPk(id);
        if (asset) {
            res.render('Asset/assetEdit',{asset}); 
        } else {
            res.json({ error: 'Asset not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ error: 'Error fetching asset for edit' });
    }
});

route.put('/:id',async(req, res) => {
    const { id } = req.params;
    const { serialNo, name, model, make, status, branch, value } = req.body;
    try {
        const asset = await Asset.findByPk(id);
        if (asset) {
            const updatedAsset = await asset.update({ serialNo, name, model, make, status, branch, value });
            res.redirect('/assets'); 
        } else {
            res.render('error', { message: 'Asset not found' });
        }
    } catch (err) {
        console.error(err);
        res.render('error',{ message: 'Error updating asset' });
    }
});


// route.put('/:id',async (req, res) => {
//     const { id } = req.params;
//     const { serialNo,name,model,make,status,branch,value } = req.body;
//     try {
//         const asset = await Asset.findByPk(id);
//         if (asset) {
//             const updatedAsset = await asset.update({ serialNo, name, model, make, status, branch, value });
//             res.json(updatedAsset);
//         } else {
//             res.json({ error:'Asset not found'});
//         }
//     } catch (err) {
//         console.error(err);
//         res.json({ error:'Error updating asset'});
//     }
// });

module.exports = route;


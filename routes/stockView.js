const express=require('express')
const route=express.Router()
const Asset=require('../model/asset')
const { Op } = require('sequelize')
const sequelize=require('../db/db')


route.get('/',async(req,res)=>{
    try{
        const stockValue=await Asset.findAll({
            where:{status:'Available'},
            attributes:[
                'branch',
                [sequelize.fn('COUNT',sequelize.col('id')),'total_assets'],
                [sequelize.fn('SUM',sequelize.col('value')),'total_value']
            ],
            group:['branch']
          }) 
          const stock = stockValue.map(item => item.dataValues) 
          const totalValue = await Asset.sum('value', {
            where: { status: 'Available' },
        });
        console.log("Stock Data:",stock);
         console.log("Total Value:",totalValue)
        // console.log('stock',{ stock, totalValue });
        res.render('stock',{stock,totalValue})
        // res.json({stock,totalValue})
    }
    catch{
        res.json("Error")
    }
    
})

module.exports=route



const express=require('express')
const route=express.Router()
const Asset=require('../model/asset')
const Employee=require('../model/employee')
const AssetHistory=require('../model/assetHistory')

// route.get('/', async (req, res) => {
//   const assets = await Asset.findAll({ where: { status: 'Available' } });
//   res.json(assets);
// });

// route.get('/', async (req, res) => {
//   const employees = await Employee.findAll({ where: { status: 'active' } });
//   res.json(employees);
// });

route.get('/', async (req, res) => {
  const assets = await Asset.findAll({ where: { status: 'Available' } })
  const employees = await Employee.findAll({ where: { status: 'active' } })
  res.render('issue', { assets, employees })
});


route.post('/', async (req, res) => {
  const {assetId,employeeId} = req.body;

  await Asset.update({status:'Issued'},{ where:{id: assetId}});

  await AssetHistory.create({
      assetId,
      employeeId,
      action: 'Issued',
      date: new Date()
  });
    res.redirect('/issue')
  // res.json({ message: 'Asset issued successfully', assetId, employeeId });
});



module.exports=route
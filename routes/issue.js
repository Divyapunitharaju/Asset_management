const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const Employee = require('../model/employee')
const AssetHistory = require('../model/assetHistory')


route.get('/', async (req, res) => {
  try {
    const assets = await Asset.findAll({ where: { status: 'Available' } })
    const employees = await Employee.findAll({ where: { status: 'active' } })
    res.render('issue', { assets, employees });
  } catch (err) {
    console.error(err)
    res.json({ message: 'Error fetching data for issue page' })
  }
})


route.post('/', async (req, res) => {
  const { assetId, employeeId } = req.body

  if (!assetId || !employeeId) {
    return res.json({ message: 'Asset ID and Employee ID are required' })
  }

  try {
    await Asset.update({ status: 'Issued' }, { where: { id: assetId } })
    await AssetHistory.create({
      assetId,
      employeeId,
      action: 'Issued',
      date: new Date()
    })

    
    res.redirect('/issue')
  } catch (err) {
    console.error(err)
    res.json({ message: 'Error issuing asset' })
  }
})

module.exports = route

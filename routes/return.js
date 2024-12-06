const express = require('express')
const route = express.Router()
const Asset = require('../model/asset')
const AssetHistory = require('../model/assetHistory')

route.get('/', async (req, res) => {
  try {
    const issueAsset = await Asset.findAll({ where: { status: "Issued" } })
    res.render('return', { issueAsset });
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Error fetching issued assets" });
  }
})

route.post('/', async (req, res) => {
  const { assetId, reason } = req.body

  
  if (!assetId || !reason) {
    return res.status(400).json({ message: 'Asset ID and reason are required' })
  }

  try {
    await Asset.update({ status: 'Available' }, { where: { id: assetId } })

    await AssetHistory.create({
      assetId,
      employeeId: null, 
      action: "Returned",
      reason: reason,
      date: new Date()
    })

    res.redirect('/return')
  } catch (err) {
    console.error(err)
    res.json({ message: 'Error processing asset return' })
  }
})

module.exports = route

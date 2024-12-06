const express = require('express')
const route = express.Router()
const AssetCategory = require('../model/assetCategory')


route.post('/', async (req, res) => {
    const { name } = req.body
    try {
        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        await AssetCategory.create({ name })
        res.redirect('/assetCategories') 
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while creating asset category' })
    }
})


route.get('/', async (req, res) => {
    try {
        const assetCategories = await AssetCategory.findAll()
        res.render('AssetCategory/assetCategory', { assetCategories })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching asset categories' })
    }
})


route.get('/add', (req, res) => {
    res.render('AssetCategory/assetCategoryAdd')
})


route.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).json({ message: 'Asset Category not found' })
        }

        res.json(assetCategory)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching asset category by ID' })
    }
})


route.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name } = req.body

    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).json({ message: 'Asset Category not found' })
        }

        if (!name) {
            return res.status(400).json({ message: 'Name is required' })
        }

        await assetCategory.update({ name })
        res.redirect('/assetCategories') 
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while updating asset category' })
    }
})


route.get('/edit/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const assetCategory = await AssetCategory.findOne({ where: { id } })

        if (!assetCategory) {
            return res.status(404).render('error', { message: 'Asset Category not found' })
        }

        res.render('AssetCategory/assetCategoryEdit', { assetCategory })
    } catch (err) {
        console.error(err)
        res.status(500).render('error', { message: 'Error while fetching asset category for editing' })
    }
})

module.exports = route

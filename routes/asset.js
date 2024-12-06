const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Asset = require('../model/asset');


router.post('/', async (req, res) => {
    const { serialNo, name, model, make, status, branch, value } = req.body;
    try {
        if (!serialNo || !name || !model || !make || !branch || !value) {
            return res.json({ error: 'All fields are required' });
        }

        await Asset.create({ serialNo, name, model, make, status, branch, value });
        res.redirect('/assets');
    } catch (err) {
        console.error(err);
        res.json({ error: 'Error creating asset' });
    }
});


router.get('/', async (req, res) => {
    const { name, make, model } = req.query;
    try {
        const whereClause = {};
        if (name) whereClause.name = name;
        if (model) whereClause.model = { [Op.iLike]: `%${model}%` };
        if (make) whereClause.make = { [Op.iLike]: `%${make}%` };

        const assets = await Asset.findAll({ where: whereClause });
        res.render('Asset/asset', { assets });
    } catch (err) {
        console.error(err);
        res.json({ error: 'Error fetching assets' });
    }
});


router.get('/add', (req, res) => {
    res.render('Asset/assetAdd');
});


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const asset = await Asset.findOne({ where: { id } });
        if (asset) {
            res.render('Asset/assetEdit', { asset });
        } else {
            res.json({ error: 'Asset not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ error: 'Error fetching asset for edit' });
    }
});

// Update Asset
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { serialNo, name, model, make, status, branch, value } = req.body;
    try {
        const asset = await Asset.findOne({ where: { id } });
        if (asset) {
            await asset.update({ serialNo, name, model, make, status, branch, value });
            res.redirect('/assets');
        } else {
            res.render('error', { message: 'Asset not found' });
        }
    } catch (err) {
        console.error(err);
        res.render('error', { message: 'Error updating asset' });
    }
});

module.exports = router;

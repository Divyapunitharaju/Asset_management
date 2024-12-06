const express = require('express')
const route = express.Router()
const { Op } = require('sequelize')
const Employee = require('../model/employee')


route.post('/', async (req, res) => {
    const { name, position, status } = req.body
    try {
        if (!name || !position || !status) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        await Employee.create({ name, position, status })
        res.redirect('/employees')
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while creating employee' })
    }
})


route.get('/', async (req, res) => {
    const { status, search } = req.query
    const whereClause = {}

    try {
        if (status) {
            whereClause.status = status
        }
        if (search) {
            whereClause.name = { [Op.iLike]: `%${search}%` }
        }

        const employees = await Employee.findAll({ where: whereClause })
        res.render('Employee/employee', { employees })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while fetching employees' })
    }
});

route.get('/add', (req, res) => {
    res.render('Employee/employeeAdd')
})

route.get('/edit/:id', async (req, res) => {
    const { id } = req.params

    try {
        const employee = await Employee.findOne({ where: { id } })

        if (!employee) {
            return res.redirect('/employees')
        }

        res.render('Employee/employeeEdit', { employee })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while fetching employee for edit' })
    }
})


route.put('/:id', async (req, res) => {
    const { id } = req.params
    const { name, position, status } = req.body

    try {
        const employee = await Employee.findOne({ where: { id } })

        if (!employee) {
            return res.redirect('/employees')
        }

        if (!name || !position || !status) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        await employee.update({ name, position, status })
        res.redirect('/employees')
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Error while updating employee' })
    }
})

module.exports = route

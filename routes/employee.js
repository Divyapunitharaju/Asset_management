const express = require('express')
const route = express.Router();
const {Op}=require('sequelize')

const Employee = require('../model/employee')

route.post('/',async(req, res) => {
    const {name,position,status} = req.body
    try {
        const employee =await Employee.create({name,position,status })
        res.redirect('/employees')
    }
    catch {
        console.error(err);
        res.json({mesage:"Error"})
    }

})

route.get('/',async(req,res)=>{
    const {status,search}=req.query
    const whereClause={}
    try{
        if(status){
            whereClause.status=status
        }
        if(search){
            whereClause.name={[Op.iLike]:`%${search}%`}
        }
        const employees=await Employee.findAll({where:whereClause})
        res.render('Employee/employee',{employees})
    }
    catch{
        console.error(err);
        res.json({mesage:"Error"})
    }
    
})


// route.get('/', async(req, res) => {
//     try{
//         const employees =await Employee.findAll()
//         res.json(employees)
//     }catch{
//          res.json("Error")
//     } 
    
// })
route.get('/add',(req,res) => {
    res.render('Employee/employeeAdd');
})

route.get('/edit/:id',async(req,res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findByPk(id)
        if (employee) {
            res.render('Employee/employeeEdit', {employee})
        } else {
            res.redirect('/employees')
        }
    } catch {
        console.error(err);
        res.json({mesage:"Error"})
    }
});

// route.put('/:id',async(req,res)=>{
//     const {id}=req.params
//     const {name,position,status}=req.body
//      try{
//          const employee=await Employee.findByPk(id)
//          if(employee){
//             const updateEmployee=await employee.update({name,position,status})
//             res.redirect('/employees')
//          }else {
//             res.redirect('/employees');  
//         }
//         console.log("Update route hit for ID:", id);
//         console.log("Body data:", req.body);

//      }catch{
//         res.json("Error")
//      }
// })

route.put('/:id',async(req,res) => {
    const {id} = req.params;
    const {name,position,status} = req.body
    try {
        const employee = await Employee.findByPk(id)
        if (employee) {
            const updatedEmployee = await employee.update({name,position,status})
            res.redirect('/employees');
        } else {
            res.redirect('/employees');
        }
    } catch (error) {
        console.error(err);
        res.json({mesage:"Error"})
    }
});




module.exports = route
const {DataTypes}=require('sequelize')
const sequelize=require('../db/db')

const Employee=sequelize.define('Employee',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    position:{
        type:DataTypes.STRING,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('active','inactive'),
        allowNull:false,
        defaultValue:'active'
    }
    
})

module.exports=Employee
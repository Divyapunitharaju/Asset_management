const {DataTypes}=require('sequelize')
const sequelize=require('../db/db')
const Employee=require('../model/employee')

const Asset=sequelize.define('Asset',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    serialNo:{
        type:DataTypes.STRING,
        allowNull:false, 
        unique:true
    },
    make:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false, 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type:DataTypes.ENUM('Available','Issued','Obsolete'),
        allowNull: false,
        defaultValue: 'Available'
    },
    branch: {
        type: DataTypes.STRING,
        allowNull: true
    },
    value:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    returnReason:{
        type: DataTypes.STRING,
        allowNull: true, 
    },
})

module.exports=Asset
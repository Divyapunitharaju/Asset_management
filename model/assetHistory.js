const { DataTypes } = require('sequelize')
const sequelize = require('../db/db')
const Asset=require('../model/asset')
const Employee=require('../model/employee')

const AssetHistory = sequelize.define('AssetHistory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    assetId: {
        type: DataTypes.INTEGER,
        references: {
            model: Asset,
            key: 'id'
        },
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        references: {
            model: Employee,
            key: 'id',
        },
        allowNull: true,
    },
    action:{
        type:DataTypes.ENUM('Issued','Returned','Obsolete'),
        allowNull:false
    },
    date:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW  
    },
    reason: {
        type: DataTypes.STRING,
        allowNull: true,
      }

})


AssetHistory.belongsTo(Asset, { foreignKey: 'assetId' });
AssetHistory.belongsTo(Employee, { foreignKey: 'employeeId' })

module.exports=AssetHistory
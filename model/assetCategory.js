const { DataTypes } = require('sequelize')

const sequelize = require('../db/db')

const AssetCategory = sequelize.define('AssetCategory', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

})



module.exports=AssetCategory
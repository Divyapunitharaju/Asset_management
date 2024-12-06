const { Sequelize } = require("sequelize");

const db=new Sequelize(
    'Management_asset',
    'postgres',
    'postgres',
    {
        host:'localhost',
        dialect:'postgres'
    }
)

module.exports=db
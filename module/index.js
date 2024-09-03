const { Sequelize, HasMany } = require("sequelize");
const dbConfig = require("../config/dbConfig");

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port:3307
    
});

const db = {};
db.sequelize = sequelize;
db.models = {};

db.models.Emp=require('./employee')(sequelize,Sequelize.DataTypes)
db.models.Leave=require('./leave')(sequelize,Sequelize.DataTypes)
db.models.LeaveType=require('./laeve_type')(sequelize,Sequelize.DataTypes)

db.models.Emp.hasMany(db.models.Leave)
db.models.Leave.belongsTo(db.models.Emp)

db.models.LeaveType.hasMany(db.models.Leave)
db.models.Leave.belongsTo(db.models.LeaveType)

module.exports = db;

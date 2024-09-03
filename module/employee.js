const { DataTypes, sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Emp = sequelize.define('employee', {
        system_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        F_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        L_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        mobile_no: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Emp;
    
};

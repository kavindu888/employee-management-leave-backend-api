module.exports = (sequelize, DataTypes) => {

    const Leave = sequelize.define('leave',
        {
            
            leave_date: DataTypes.STRING,
            status: DataTypes.INTEGER,
            month:DataTypes.STRING,
            year:DataTypes.STRING,
            remark:DataTypes.STRING

        },
        {
            freezeTableName: true
        });

    return Leave;

};
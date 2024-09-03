module.exports = (sequelize, DataTypes) => {

    const LaeveType = sequelize.define('leave_type',
        {
            type: DataTypes.STRING,

        },
        {
            freezeTableName: true
        });

    return LaeveType;

};
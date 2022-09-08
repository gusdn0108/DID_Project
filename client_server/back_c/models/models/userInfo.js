module.exports = (sequelize, DataTypes) => {
    const userInfo = sequelize.define(
        'userInfo',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobile: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'userInfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return userInfo;
};

module.exports = (sequelize, DataTypes) => {
    const UserInfo = sequelize.define(
        'UserInfo',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            mobile: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'UserInfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return UserInfo;
};

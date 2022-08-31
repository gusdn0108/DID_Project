module.exports = (sequelize, DataTypes) => {
    const getInfo = sequelize.define(
        'getInfo',
        {
            appName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            owner: {
                type: DataTypes.STRING,
                allowNull : false
            },
            email: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            name: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            gender: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            age: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            addr: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            mobile: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 'getInfo',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return getInfo;
};

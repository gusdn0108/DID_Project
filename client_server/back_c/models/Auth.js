module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define(
        'Auth',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userHash: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0,
            },
            mobile: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'Auth',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return Auth;
};

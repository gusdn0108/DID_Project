module.exports = (sequelize, DataTypes) => {
    const account = sequelize.define(
        'account',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'account',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return account;
};

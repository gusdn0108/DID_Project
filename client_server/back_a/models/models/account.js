module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define(
        'Account',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'Account',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return Account;
};

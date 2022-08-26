module.exports = (sequelize, DataTypes) => {
    const oAuth = sequelize.define(
        'oAuth',
        {
            restAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            redirectURL: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'oAuth',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return oAuth;
};

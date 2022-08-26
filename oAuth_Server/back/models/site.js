module.exports = (sequelize, DataTypes) => {
    const AccessSite = sequelize.define(
        'AccessSite',
        {   
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            appName:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            redirectURI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            restAPI: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            clientSecretKey: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 'AccessSite',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return AccessSite;
};

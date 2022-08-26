module.exports = (sequelize, DataTypes) => {
    const site = sequelize.define(
        'site',
        {
            hashId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            A: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
            B: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
            C: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
            },
            D: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                default: false,
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

    return site;
};

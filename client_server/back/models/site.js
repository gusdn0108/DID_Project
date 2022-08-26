module.exports = (sequelize, DataTypes) => {
    const site = sequelize.define(
        'A',
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            point: {
                type: DataTypes.INTEGER,
                allowNull: false,
                default: 0,
            },
        },
        {
            timestamps: false,
            tableName: 'A',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return site;
};

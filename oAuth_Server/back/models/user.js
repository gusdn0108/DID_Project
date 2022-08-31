module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define(
        'user',
        {
            hashId: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            A: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            B: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            C: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            D: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            age: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            addr: {
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
            tableName: 'oAuth',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return user;
};

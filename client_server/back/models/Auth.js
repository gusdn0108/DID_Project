module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define(
        'Auth',
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
<<<<<<< HEAD

            },
            point : {
                type:DataTypes.INTEGER,
=======
            },
            point: {
                type: DataTypes.INTEGER,
>>>>>>> a5a1b19928760e87b6f632b2b03272c06bac3e07
                allowNull: false,
                default: 0,
            },
        },
        {
            timestamps: false,
            tableName: 'Login',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            freezeTableName: true,
        },
    );

    return Auth;
};

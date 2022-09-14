import { AllowNull, Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'verify_id',
    omitNull: true,
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
})
export default class VerifyId extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING,
    })
    public email?: string;
}

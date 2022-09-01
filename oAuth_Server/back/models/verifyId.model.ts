import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    tableName:'verify_id',
    omitNull:true,
    timestamps:true,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})

export default class verifyId extends Model{
    @PrimaryKey
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public hashId?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public emial?: string;
}
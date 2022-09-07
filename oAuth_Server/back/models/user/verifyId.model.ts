import {AllowNull, Column, DataType, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    tableName:'verify_id',
    omitNull:true,
    timestamps:false,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})

export default class VerifyId extends Model{
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
    public email?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;



    //096398ac5f253b00d96acaf88d04218
}
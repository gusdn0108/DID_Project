import {Model, Column, Table, PrimaryKey, DataType, AllowNull, ForeignKey, HasMany, BelongsTo} from 'sequelize-typescript';
import App from './app.model';


@Table({
    modelName:'data_needed',
    omitNull:true,
    timestamps:true,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})

export default class DataNeeded extends Model {
    @ForeignKey(()=>App)
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;
    
    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public gender?: boolean;

    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public age?: boolean;

    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public name?: boolean;

    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public mobile?: boolean;

    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public email?: boolean;

    @AllowNull(false)
    @Column({
        type:DataType.BOOLEAN
    })
    public addr?: boolean;
}
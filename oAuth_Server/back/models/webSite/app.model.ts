import {Column, Model, Table, DataType, PrimaryKey, AllowNull, HasMany} from 'sequelize-typescript'
import DataNeeded from './dataNeeded.model';
import RedirectURI from './redirectURI.model';

@Table({
    modelName:'app',
    omitNull:true,
    timestamps:false,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})

export default class App extends Model {
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public owner?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public appName?: string;

    @AllowNull(true)
    @Column({
        type:DataType.STRING
    })
    public code?: string;

    @PrimaryKey
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;
}
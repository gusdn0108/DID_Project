import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import App from "./app.model";


@Table({
    modelName:'redirectURI',
    omitNull:true,
    timestamps:false,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})
export default class RedirectURI extends Model{
    @ForeignKey(()=>App)
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI?: string;
}
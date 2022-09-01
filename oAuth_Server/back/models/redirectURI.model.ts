import { AllowNull, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import app from "./app.model";


@Table({
    modelName:'redirectURI',
    omitNull:true,
    timestamps:true,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})
export default class RedirectURI extends Model{

    @ForeignKey(()=>{return app})
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI1?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI2?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI3?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI4?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public redirectURI5?: string;
}
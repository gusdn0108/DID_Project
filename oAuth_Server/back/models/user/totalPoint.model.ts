import { Model,Column, Table, AllowNull, DataType, ForeignKey } from "sequelize-typescript";
import App from "../webSite/app.model";

@Table({
    modelName:'point_total',
    omitNull:true,
    timestamps:true,
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
})

export default class TotalPoint extends Model {
    @ForeignKey(()=>App)
    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public hashId?: string;

    @AllowNull(false)
    @Column({
        type:DataType.STRING
    })
    public restAPI?: string;

    @AllowNull(false)
    @Column({
        type:DataType.INTEGER
    })
    public point?: number;
}

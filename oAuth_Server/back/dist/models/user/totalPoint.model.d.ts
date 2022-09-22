import { Model } from "sequelize-typescript";
export default class TotalPoint extends Model {
    email?: string;
    restAPI?: string;
    point?: number;
}

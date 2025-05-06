import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Seasons extends Model {

}

Seasons.init(
    {
        season_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        season_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Seasons', tableName: 'seasons'
    })
export {Seasons}
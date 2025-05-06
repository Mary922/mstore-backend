import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Regions extends Model {

}

Regions.init(
    {
        region_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        region_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Regions', tableName: 'regions'
    })
export {Regions}
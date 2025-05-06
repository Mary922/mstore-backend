import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Cities extends Model {

}

Cities.init(
    {
        city_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Cities', tableName: 'cities'
    })
export {Cities}
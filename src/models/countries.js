import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Countries extends Model {

}

Countries.init(
    {
        country_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        country_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Countries', tableName: 'countries'
    })
export {Countries}
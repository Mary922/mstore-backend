import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Divisions extends Model {

}

Divisions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        division_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        division_phone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Divisions', tableName: 'divisions'
    })
export {Divisions}
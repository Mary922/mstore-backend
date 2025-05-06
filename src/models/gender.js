import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Gender extends Model {

}

Gender.init(
    {
        gender_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        gender_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Gender', tableName: 'gender'
    })
export {Gender}
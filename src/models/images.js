import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Images extends Model {

}

Images.init(
    {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    },{
        sequelize,modelName: 'Images', tableName: 'images'
    })
export {Images}
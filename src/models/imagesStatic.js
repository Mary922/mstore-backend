import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ImagesStatic extends Model {

}

ImagesStatic.init(
    {
        image_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ImagesStatic', tableName: 'images_static'
    })
export {ImagesStatic}
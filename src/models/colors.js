import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Colors extends Model {

}

Colors.init(
    {
        color_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        color_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color_rgb: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: DataTypes.INTEGER
    },{
        sequelize,modelName: 'Colors', tableName: 'colors'
    })
export {Colors}
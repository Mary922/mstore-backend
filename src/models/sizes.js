import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Sizes extends Model {

}

Sizes.init(
    {
        size_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        size_type: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: DataTypes.INTEGER,
    },{
        sequelize,modelName: 'Sizes', tableName: 'sizes'
    })
export {Sizes}
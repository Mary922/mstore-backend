import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Tags extends Model {

}

Tags.init(
    {
        tag_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tag_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: DataTypes.INTEGER
    },{
        sequelize,modelName: 'Tags', tableName: 'tags'
    })
export {Tags}
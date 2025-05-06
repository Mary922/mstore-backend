import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Categories extends Model {

}

Categories.init(
    {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deleted_at: DataTypes.INTEGER,
        parent_id : DataTypes.INTEGER,
        order_index : DataTypes.INTEGER,
    },{
        sequelize,modelName: 'Categories', tableName: 'categories'
    })
export {Categories}
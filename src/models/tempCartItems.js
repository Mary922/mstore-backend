import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class TempCartItems extends Model {

}

TempCartItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        created_at: DataTypes.INTEGER,
    },{
        sequelize,modelName: 'TempCartItems', tableName: 'temp_cart_items'
    })
export {TempCartItems}
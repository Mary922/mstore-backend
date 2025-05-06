import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class CartItems extends Model {

}

CartItems.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
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
        sequelize,modelName: 'CartItems', tableName: 'cart_items'
    })
export {CartItems}
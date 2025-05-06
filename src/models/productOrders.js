import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";

class ProductOrders extends Model {

}

ProductOrders.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,modelName: "ProductOrders",tableName: "productOrders",
    }
)
export {ProductOrders}
import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";

class Orders extends Model {

}

Orders.init(
    {
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        order_sum: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: DataTypes.INTEGER
    },
    {
        sequelize,modelName: "Orders",tableName: "orders",
    }
)
export {Orders}
import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";

class Cart extends Model {

}


Cart.init({
    client_id: {
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
    }
},{
    sequelize,modelName: "Cart",tableName: "cart",
})
export {Cart};
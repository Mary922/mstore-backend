import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";

class Wishlist extends Model {

}

Wishlist.init({
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        created_at: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
    sequelize, modelName: "Wishlist",tableName: "wishlist",
    }
)
export {Wishlist};
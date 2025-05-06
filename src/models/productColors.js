import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ProductColors extends Model {

}

ProductColors.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ProductColors', tableName: 'productColors'
    })
export {ProductColors}
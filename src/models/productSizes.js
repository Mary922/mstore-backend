import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ProductSizes extends Model {

}

ProductSizes.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        size_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ProductSizes', tableName: 'productSizes'
    })
export {ProductSizes}
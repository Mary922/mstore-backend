import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ProductCategories extends Model {

}

ProductCategories.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ProductCategories', tableName: 'productCategories'
    })
export {ProductCategories}
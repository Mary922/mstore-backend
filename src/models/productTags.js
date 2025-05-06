import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ProductTags extends Model {

}

ProductTags.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ProductTags', tableName: 'productTags'
    })
export {ProductTags}
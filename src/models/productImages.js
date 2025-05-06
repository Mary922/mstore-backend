import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ProductImages extends Model {

}

ProductImages.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        order_index: {
            type: DataTypes.INTEGER,
        },
    },{
        sequelize,modelName: 'ProductImages', tableName: 'productImages'
    })
export {ProductImages}
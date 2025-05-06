import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Brands extends Model {

}

Brands.init(
    {
        brand_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        brand_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Brands', tableName: 'brands'
    })
export {Brands}
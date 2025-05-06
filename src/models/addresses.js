import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Addresses extends Model {

}


Addresses.init(
    {
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        address_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        client_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isActual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        sequelize,modelName: 'Addresses', tableName: 'addresses'
    })
export {Addresses}
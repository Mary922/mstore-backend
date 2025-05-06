import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class AddressRegions extends Model {

}

AddressRegions.init(
    {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'AddressRegions', tableName: 'addressRegions'
    })
export {AddressRegions}
import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Subscriptions extends Model {

}

Subscriptions.init(
    {
        subscription_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        subscription_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deleted_at: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'Subscriptions', tableName: 'subscriptions'
    })
export {Subscriptions}
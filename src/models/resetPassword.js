import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class ResetPassword extends Model {

}

ResetPassword.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reset_token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        reset_token_expiry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },{
        sequelize,modelName: 'ResetPassword', tableName: 'resetPassword'
    })
export {ResetPassword}
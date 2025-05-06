import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class TempRegisterPasswords extends Model {

}

TempRegisterPasswords.init(
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
        generated_password: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: DataTypes.INTEGER,
    },{
        sequelize,modelName: 'TempRegisterPasswords', tableName: 'temp_register_passwords'
    })
export {TempRegisterPasswords}
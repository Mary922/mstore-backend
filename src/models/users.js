import {sequelize} from "./sequelize.js";
import {DataTypes, Model} from "sequelize";

class Users extends Model {
    static getByUsername(username) {
        return this.findOne({
            where: {
                username: username,
            }
        })
    }

}

Users.init(
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_password: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        token: DataTypes.STRING,
    },{
        sequelize,modelName: 'Users', tableName: 'users'
    })
export {Users}

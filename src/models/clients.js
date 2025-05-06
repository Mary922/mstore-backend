import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";
import {Addresses} from "./associations.js";

class Clients extends Model {
    static getByEmail(email) {
        return this.findOne({
            where: {
                client_email: email
            }
        })
    }

    static getById(id) {
        return this.findOne({
            where: {
                client_id: id
            },
            include: [
                {
                    required: false,
                    model: Addresses,
                    attributes: ['region_id', 'city_id', 'address_name'],
                    where: {
                        isActual: 1
                    }
                }
            ]
        })
    }

}

Clients.init(
    {
        client_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        client_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_phone: {
            type: DataTypes.CHAR,
            allowNull: true,
        },
        client_email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_birthday: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        client_password: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: DataTypes.INTEGER,
    },
    {
        sequelize, modelName: "Clients", tableName: "clients",
    }
)
export {Clients}
import {sequelize} from "./sequelize.js";
import {DataTypes, Model, Op} from "sequelize";
import {Images} from "./associations.js";

class Products extends Model {
    static getById(id) {
        return this.findOne({
            where: {
                product_id: id
            }
        })
    }

    static getByIds(ids) {
        return this.findAll({
            where: {
                product_id: {
                    [Op.in]: ids
                }
            },
            include: {
                model: Images,
                attributes: ['image_id', 'image_path'],
            }
        })
    }


    static async createInBulk(id, dataArray, key, model, t) {
        let itemsToCreate = [];
        for (let i = 0; i < dataArray.length; i++) {
            itemsToCreate.push({
                product_id: id,
                [key]: dataArray[i]
            })
        }
        await model.bulkCreate(itemsToCreate, {transaction: t});
    }
}

Products.init(
    {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_at: DataTypes.INTEGER,
        deleted_at: DataTypes.INTEGER,
        unit_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.INTEGER,
        },
        product_description: DataTypes.STRING,
    }, {
        sequelize, modelName: 'Products', tableName: 'products'
    })
export {Products}
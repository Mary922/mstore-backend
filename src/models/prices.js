import {DataTypes, Model} from "sequelize";
import {sequelize} from "./sequelize.js";


class Prices extends Model {
    static createProductPrice(productId,price,timeBeginning){
        return this.create({
            product_id: productId,
            price: price,
            time_beginning: timeBeginning
        })
    }
}

Prices.init({
    price_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_beginning: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    time_ending: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
},{
    sequelize,modelName: 'Prices', tableName: 'prices'
})
export {Prices}
import {Sequelize} from 'sequelize';




console.log(process.env);

export const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD, {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    define: {
        timestamps: false
    }
})
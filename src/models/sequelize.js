import {Sequelize} from 'sequelize';

export const sequelize = new Sequelize('crm','root','123123',{
    host:'127.0.0.1',
    dialect:'mysql',
    // logging: null,
    define: {
        timestamps: false
    }
})
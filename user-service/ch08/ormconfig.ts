import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'nodejs',
    database: 'test',
    entities: [__dirname + '/**/*.entity.js'],
    synchronize: false,
    migrations: [__dirname + '/**/migrations/*.js'],
    migrationsTableName: 'migrations',
});
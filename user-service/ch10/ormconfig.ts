import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'nodejs',
  database: 'test',
  entities: [__dirname + '/**/*.entity.ts'],
  synchronize: true,
  migrations: [__dirname + '/**/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
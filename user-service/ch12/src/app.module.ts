import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {ExceptionModule} from "./exception/exception.module";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'nodejs',
            database: 'test',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
            migrations: [__dirname + '/**/migrations/*.js'],
            migrationsTableName: 'migrations',
        }),
        ExceptionModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import emailConfig from "./config/emailConfig";
import { validationSchema } from "./config/validationSchema";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
            load: [emailConfig],
            isGlobal: true,
            validationSchema,
        }),
        TypeOrmModule.forRoot({ // 1
            type: 'mysql', // 2
            host: process.env.DATABASE_HOST, // 'localhost', // 3
            port: 3306, // 4
            username: process.env.DATABASE_USERNAME, // 'root', // 5
            password: process.env.DATABASE_PASSWORD, //'nodejs', // 5
            database: 'test', // 6
            entities: [__dirname + '/**/*.entity{.ts,.js}'], // 7
            // synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // 8
            synchronize: false, // 1
            migrationsRun: false, // 2
            migrations: [__dirname + '/**/migrations/*.js'], // 3
            migrationsTableName: 'migrations' // 4
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import emailConfig from "./config/emailConfig";
import { validationSchema } from "./config/validationSchema";
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import authConfig from "./config/authConfig";

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [emailConfig, authConfig],
      isGlobal: true,
      // validationSchema,
    }),
    TypeOrmModule.forRoot({ // 1
      type: 'mysql', // 2
      host: '127.0.0.1', // 'localhost', // 3
      port: 3306, // 4
      username: 'root', // 'root', // 5
      password: 'nodejs', //'nodejs', // 5
      database: 'test', // 6
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 7
      // synchronize: process.env.DATABASE_SYNCHRONIZE === 'true', // 8
      synchronize: true, // 1
      migrationsRun: false, // 2
      migrations: [__dirname + '/**/migrations/*.js'], // 3
      migrationsTableName: 'migrations' // 4
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

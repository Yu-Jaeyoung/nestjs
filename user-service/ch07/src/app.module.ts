import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import emailConfig from "./config/emailConfig";
import { validationSchema } from "./config/validationSchema";
import { UsersModule } from './users/users.module';

@Module({
    imports: [UsersModule,
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`], // 1.
            load: [emailConfig], // 2.
            isGlobal: true, // 3.
            validationSchema // 4
        }),],
    controllers: [],
    providers: [],
})
export class AppModule {
}

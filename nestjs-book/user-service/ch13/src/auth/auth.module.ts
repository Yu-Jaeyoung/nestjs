import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import authConfig from '../config/authConfig'; // 상대경로 수정 필요

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [authConfig],
        }),
    ],
    controllers: [],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}

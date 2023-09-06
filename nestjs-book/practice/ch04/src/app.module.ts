import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseService } from './base-service';
import { ServiceA } from './service-A';
import { ServiceB } from './service-B';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  providers: [AppService, BaseService, ServiceA, ServiceB],
  imports: [UsersModule],
})
export class AppModule { }

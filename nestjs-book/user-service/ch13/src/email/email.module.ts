import { Module } from '@nestjs/common';
import emailConfig from 'src/config/emailConfig';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
    imports: [
        ConfigModule.forFeature(emailConfig), // Import emailConfig as a feature config
    ],
    providers: [
        EmailService, // Register EmailService as a provider
    ],
    exports: [
        EmailService, // Export EmailService to be used in other modules
    ],
})
export class EmailModule { }

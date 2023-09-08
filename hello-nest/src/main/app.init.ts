import {
    NestFactory,
} from "@nestjs/core";

import {
    Logger as logger,
} from "@nestjs/common";

import {
    AppModule,
} from "@main/app.module";

import appConfig from "@main/configurer/app.config";

import {
    ConfigType,
} from "@nestjs/config";

import {
    LoggerService,
} from "@main/common/logger/logger.service";

import helmet from "helmet";

// import * as fs from "fs";

const context = "ApplicationInitializer";

async function bootstrap(): Promise<void> {

    // const httpsOptions = {
    //     cert: fs.readFileSync("./src/resource/cert/fullchain.pem"),
    //     key: fs.readFileSync("./src/resource/cert/privkey.pem"),
    // };

    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    // httpsOptions: httpsOptions,
    });

    const {
        host,
        port,
    } = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

    app.useLogger(app.get(LoggerService));
    app.use(helmet(), helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'",],
        },
        useDefaults: true,
    }), helmet.hsts({
        maxAge: 698486400,
        includeSubDomains: true,
    }));

    await app.listen(port);
    logger.log(`Application is running on: ${host}:${port}`, context);
}

bootstrap()
    .then(() => {
        logger.log(`Current Environment Mode: ${process.env.NODE_ENV}`, context);
    })
    .catch((e) => {
        logger.error(e);
    });

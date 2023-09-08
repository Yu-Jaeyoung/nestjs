import {
    Injectable,
    LoggerService as NestLoggerService, LogLevel,
} from "@nestjs/common";
import {
    storage,
} from "@main/common/logger/logger.storage";
import {
    Color,
} from "@main/common/logger/logger.utils";

@Injectable()
export class LoggerService implements NestLoggerService {

    private formatString(input: string, length: number): string {
        return input.padEnd(length, "").substring(0, length);
    }

    private formatMessage(
        level: LogLevel,
        time: string,
        context: string,
        message: string,
        requestId?: string,
    ): string {
        const formatLevel = this.formatString(level.toUpperCase(), 7);

        return `${time} | ${formatLevel} | ${context.slice(0, 19)} - ${message}(${requestId})`;
    }

    private print(level: LogLevel, ...args: unknown[]): void {
        const time: string = new Date().toISOString();
        const context: string = this.formatString(args.pop() as string, 20);
        const message: string = args.shift() as string;
        const params = args.length !== 0 ? args : undefined;

        const requestId = storage.getStore();
        const printMessage = this.formatMessage(level, time, context, message, requestId);

        switch (level) {
            case "log":
                // eslint-disable-next-line no-console
                console.log(Color.reset, printMessage, params, Color.reset);
                break;
            case "debug":
                // eslint-disable-next-line no-console
                console.log(Color.fg.gray, printMessage, params, Color.reset);
                break;
            case "warn":
                // eslint-disable-next-line no-console
                console.log(Color.fg.yellow, printMessage, params, Color.reset);
                break;
            case "error":
                // eslint-disable-next-line no-console
                console.log(Color.bg.red, printMessage, params, Color.reset);
                break;
            default:
                // eslint-disable-next-line no-console
                console.log(Color.bg.white, printMessage, params, Color.reset);
                break;
        }
    }

    debug(
        ...args: unknown[]
    ): void {
        this.print("debug", ...args);
    }

    error(
        ...args: unknown[]
    ): void {
        this.print("error", ...args);
    }

    fatal(
        ...args: unknown[]
    ): void {
        this.print("fatal", ...args);
    }

    log(
        ...args: unknown[]
    ): void {
        this.print("log", ...args);
    }

    verbose(
        ...args: unknown[]
    ): void {
        this.print("verbose", ...args);
    }

    warn(
        ...args: unknown[]
    ): void {
        this.print("warn", ...args);
    }
}

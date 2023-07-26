import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
    log(message: any, stack?: string, context?: string) {
        super.log.apply(this, arguments);
        this.doSomething();
    }

    private doSomething() {
        // 여기에 로깅에 관련된 부가 로직을 추가
        // ex. DB에 저장
    }
}
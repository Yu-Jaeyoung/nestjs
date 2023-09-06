import {Injectable} from '@nestjs/common';
import {BaseService} from './base-service';
import {ServiceA} from "./service-A";

@Injectable()
export class ServiceB extends BaseService {
    /*
    constructor(private readonly _serviceA: ServiceA) {
        super(_serviceA);
    }
    */

    getHello(): string {
        return this.doSomeFuncFromA();
    }
}

import { ServiceA } from './service-A';
import {Inject} from "@nestjs/common";

// @Injectable이 선언되어 있지 않음.
// BaseService 클래스를 직접 참조하지 않기 때문
export class BaseService {
  @Inject(ServiceA) private readonly serviceA : ServiceA;

  getHello(): string {
    return 'Hello World BASE!';
  }

  doSomeFuncFromA(): string {
    return this.serviceA.getHello();
  }
}
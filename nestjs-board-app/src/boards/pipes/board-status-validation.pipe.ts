import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
  // 속성을 읽기 전용으로 만드는데 사용
  // 읽기 전용 멤버는 클래스 외부에서 액세스 할 수 있지만 해당 값은 변경할 수 없음
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any /*metadata: ArgumentMetadata*/): any {
    // 처리가 된 인자의 값
    // console.log('value', value);
    // 인자에 대한 메타 데이터를 포함한 객체
    // console.log('metadata', metadata);

    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}

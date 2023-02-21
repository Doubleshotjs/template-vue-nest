import { Catch } from '@nestjs/common';
import { of } from 'rxjs';
import type { Observable } from 'rxjs';
import type { ExceptionFilter } from '@nestjs/common';

@Catch() // 捕获所有异常
export class AllExecptionFilter implements ExceptionFilter {
  catch(exception: any): Observable<any> {
    return of({
      ...exception,
      code: 1,
      message: exception.message,
    });
  }
}

import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExecptionFilter } from '@/filters/all-exception.filter';
import { ResponseInterceptor } from '@/interceptors/response.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinService } from './win/win.service';

@Global()
@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExecptionFilter,
    },
    WinService,
    AppService,
  ],
  exports: [WinService],
})
export class AppModule { }

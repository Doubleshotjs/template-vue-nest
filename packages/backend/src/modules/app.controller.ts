import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { IpcHandle } from '@doubleshot/nest-electron';
import { AppService } from './app.service';

@Controller({ path: '/prefix' })
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @IpcHandle('device-scale-factor')
  getDeviceScaleFactor() {
    return this.appService.getScaleFactor();
  }

  @IpcHandle('save-image')
  saveImage(@Payload('image') image: string) {
    return this.appService.saveImageToFile(image);
  }
}

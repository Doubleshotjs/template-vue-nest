import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Ipc } from '@/electron';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Ipc('device-scale-factor')
  getDeviceScaleFactor() {
    return this.appService.getScaleFactor();
  }

  @Ipc('save-image')
  saveImage(@Payload() image: string) {
    return this.appService.saveImageToFile(image);
  }
}

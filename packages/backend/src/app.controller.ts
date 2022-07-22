import { Controller } from '@nestjs/common'
import { IpcInvoke } from '@doubleshot/nest-electron-ipc-transport'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @IpcInvoke('device-scale-factor')
  getDeviceScaleFactor() {
    return this.appService.getScaleFactor()
  }

  @IpcInvoke('save-image')
  saveImage(image: string) {
    return this.appService.saveImageToFile(image)
  }
}

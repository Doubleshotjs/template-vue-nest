import { Controller } from '@nestjs/common';
import { IpcOn } from '@doubleshot/nest-electron';
import { WinService } from './win.service';

@Controller()
export class WinController {
  constructor(private readonly winService: WinService) { }

  @IpcOn('/win/close')
  public close() {
    this.winService.close();
  }

  @IpcOn('/win/maximize')
  public maximize() {
    this.winService.maximize();
  }

  @IpcOn('/win/minimize')
  public minimize() {
    this.winService.minimize();
  }
}

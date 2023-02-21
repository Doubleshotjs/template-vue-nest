import { Controller } from '@nestjs/common';
import { Ipc } from '@/electron';
import { WinService } from './win.service';

@Controller()
export class WinController {
  constructor(private readonly winService: WinService) { }

  @Ipc('/win/close')
  public close() {
    this.winService.close();
  }

  @Ipc('/win/maximize')
  public maximize() {
    this.winService.maximize();
  }

  @Ipc('/win/minimize')
  public minimize() {
    this.winService.minimize();
  }
}

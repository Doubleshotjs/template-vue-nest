import { Module } from '@nestjs/common';
import { WinController } from './win.controller';
// import { WinService } from './win.service';

@Module({
  controllers: [WinController],
  // providers: [WinService],
})
export class WinModule { }

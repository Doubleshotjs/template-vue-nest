import { join } from 'path';
import { Injectable } from '@nestjs/common';
import { BrowserWindow, app, dialog } from 'electron';
import { BACKEND_PATH, IS_PROD, RESOURCES_PATH } from '@/config';
import type { SaveDialogOptions } from 'electron';

@Injectable()
export class WinService {
  private win: BrowserWindow;

  constructor() {
    this.initWin();
  }

  private initWin() {
    const win = new BrowserWindow({
      width: 1200,
      height: 800,
      autoHideMenuBar: true,
      icon: join(RESOURCES_PATH, 'icons/256x256.png'),
      webPreferences: {
        contextIsolation: true,
        preload: join(BACKEND_PATH, 'preload.js'),
        devTools: !IS_PROD,
      },
    });

    win.webContents.openDevTools();

    win.on('closed', () => {
      win.destroy();
    });

    const URL = !IS_PROD ? process.env.DS_RENDERER_URL : `file://${join(app.getAppPath(), 'frontend/index.html')}`; // depends on electron-builder.config.js

    win.loadURL(URL);

    this.win = win;
  }

  public close() {
    this.win.close();
  }

  public maximize() {
    if (this.win.isMaximized()) {
      this.win.restore();
      return;
    }

    this.win.maximize();
  }

  public minimize() {
    this.win.minimize();
  }

  public async showSaveDialog(options: SaveDialogOptions) {
    return await dialog.showSaveDialog(this.win, options);
  }
}

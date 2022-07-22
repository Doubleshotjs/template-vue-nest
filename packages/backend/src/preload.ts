import { contextBridge, webFrame, ipcRenderer } from 'electron'
import { IpcResponse } from '@doubleshot/nest-electron-ipc-transport'

contextBridge.exposeInMainWorld(
  'electron',
  {
    setZoomFactor: webFrame.setZoomFactor.bind(webFrame),
    getDeviceScaleFactor: (): Promise<IpcResponse<number>> => ipcRenderer.invoke("device-scale-factor"),
    saveImageToFile: (image: string): Promise<IpcResponse<any>> => ipcRenderer.invoke("save-image", image),
  },
)

contextBridge.exposeInMainWorld(
  'isElectron',
  true
)

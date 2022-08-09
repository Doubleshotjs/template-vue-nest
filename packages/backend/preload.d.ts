import type { IpcResponse } from '@doubleshot/nest-electron-ipc-transport'

declare global {
  interface Window {
    electron: {
      setZoomFactor(factor: number): void,
      getDeviceScaleFactor(): Promise<IpcResponse<number>>
      saveImageToFile(image: string): Promise<IpcResponse<any>>
    },
    isElectron: boolean
  }
}
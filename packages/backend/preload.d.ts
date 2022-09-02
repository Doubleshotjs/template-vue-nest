import type { IpcResponse } from '@doubleshot/nest-electron'

declare global {
  interface Window {
    electron: {
      useZoomFactor(): { update: () => Promise<void> }
      saveImageToFile(image: string): Promise<IpcResponse<any>>
    },
    isElectron: boolean
  }
}
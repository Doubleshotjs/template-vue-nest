import { contextBridge, webFrame, ipcRenderer } from 'electron'
import { IpcResponse } from '@doubleshot/nest-electron-ipc-transport'

function getDeviceScaleFactor(): Promise<IpcResponse<number>> {
  return ipcRenderer.invoke("device-scale-factor")
}

contextBridge.exposeInMainWorld(
  'electron',
  {
    useZoomFactor: () => {
      const DESIGN_HEIGHT = 1080
      const DESIGN_DPR = 1
      const DESIGN_SCALE_FACTOR = 1
      let scaleFactor = 0

      const update = async () => {
        const height = window.innerHeight
        const dpr = window.devicePixelRatio
        if (scaleFactor === 0) scaleFactor = (await getDeviceScaleFactor()).data

        const factor = (height / DESIGN_HEIGHT) * (dpr / DESIGN_DPR) * (DESIGN_SCALE_FACTOR / scaleFactor)
        webFrame.setZoomFactor(factor)
      }

      return {
        update
      }
    },
    saveImageToFile: (image: string): Promise<IpcResponse<any>> => ipcRenderer.invoke("save-image", image),
  },
)

contextBridge.exposeInMainWorld(
  'isElectron',
  true
)

/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />
import type { IpcResponse } from '@doubleshot/nest-electron-ipc-transport'

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

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

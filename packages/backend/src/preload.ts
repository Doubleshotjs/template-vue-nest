import { contextBridge, ipcRenderer, webFrame } from 'electron';

async function invoke<TResult = any, TArg = any>(channel: string, ...args: TArg[]): Promise<TResult> {
  const res = await ipcRenderer.invoke(channel, ...args);
  if (res.code) {
    throw res;
  }
  return res?.data;
}

const electronIPC = {
  useZoomFactor: () => {
    const DESIGN_HEIGHT = 1080;
    const DESIGN_DPR = 1;
    const DESIGN_SCALE_FACTOR = 1;
    let scaleFactor = 0;

    const update = async () => {
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio;
      if (scaleFactor === 0) {
        scaleFactor = await invoke<number>('/prefix/device-scale-factor');
      }

      const factor = (height / DESIGN_HEIGHT) * (dpr / DESIGN_DPR) * (DESIGN_SCALE_FACTOR / scaleFactor);
      webFrame.setZoomFactor(factor);
    };

    return {
      update,
    };
  },
  saveImageToFile: (image: string) => invoke<string>('/prefix/save-image', { image }),
};

contextBridge.exposeInMainWorld('electron', electronIPC);
export type ElectronIPC = typeof electronIPC;

contextBridge.exposeInMainWorld(
  'isElectron',
  true,
);

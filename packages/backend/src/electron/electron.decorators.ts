import { MessagePattern } from '@nestjs/microservices';
import { ipcMain } from 'electron';
import { ipcMessageDispatcher } from './transport';

/**
 * Ipc handle decorator. It will be called by ipcRenderer.invoke
 *
 *
 * WARNING: You should handle your exception manually.
 * Example:
 *   1. Return custom structure object throw RpcException instead of Error
 *   2. Parse the return object to target value/exception in preload.js
 *
 *
 * Limitations: You could only pass all your parameters inside first parameter slot.
 * Example:
 *   1. ipcRenderer.invoke('app.message', 'hello', 'word'); // @Payload will only received 'hello'
 *   2. ipcRenderer.invoke('app.message', {title: 'hello', message: 'word'}); // This is the proper way to pass more than one parameters.
 */
export function Ipc(channel: string) {
  if (!channel) {
    throw new Error('ipc handle channel is required');
  }

  ipcMain.handle(channel, (...args) => ipcMessageDispatcher.emit(channel, ...args));

  return MessagePattern(channel);
}

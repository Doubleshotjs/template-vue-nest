import { Server } from '@nestjs/microservices';
import { isObservable, lastValueFrom } from 'rxjs';
import { ipcMessageDispatcher } from './transport';
import type { CustomTransportStrategy, MessageHandler } from '@nestjs/microservices';

export class ElectronIpcTransport extends Server implements CustomTransportStrategy {
  //
  public async onMessage(messageChannel: string, ...args: any[]): Promise<any | void> {
    try {
      const handler: MessageHandler | undefined = this.messageHandlers.get(messageChannel);
      if (!handler) {
        const errMsg = `No handler for message channel "${messageChannel}"`;
        this.logger.warn(errMsg);
        throw new Error(errMsg);
      }

      this.logger.log(`[IPC] Process message ${messageChannel}`);
      const [ipcMainEventObject, payload] = args;

      return await handler(payload, ipcMainEventObject).then(async (res) => {
        if (isObservable(res)) {
          return await lastValueFrom(res);
        }

        return res;
      });
    } catch (error) {
      this.logger.error(error);
      // v8 error only pass message property
      throw error;
    }
  }

  close(): any {
  }

  listen(callback: () => void): any {
    ipcMessageDispatcher.on('ipc-message', this.onMessage.bind(this));
    callback();
  }
}

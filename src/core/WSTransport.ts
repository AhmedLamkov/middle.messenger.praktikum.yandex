import EventBus from './eventBus.ts';
import { Routes } from '../main.ts';
import Router from './Router.ts';

export const WSTransportEvents = {
  Connected: 'connected',
  Error: 'error',
  Message: 'message',
  Close: 'close',
} as const;

export default class WSTransport extends EventBus<string> {
  private socket: WebSocket | null = null;

  private pingInterval?: ReturnType<typeof setInterval>;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: unknown) {
    if (!this.socket) {
      throw new Error('Socket is not connected');
    }

    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    this.socket = new WebSocket(this.url);

    this.subscribe(this.socket);

    this.setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Connected, () => {
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
  }

  private setupPing() {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, 5000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this.pingInterval);
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit(WSTransportEvents.Connected);
    });
    socket.addEventListener('close', () => {
      this.emit(WSTransportEvents.Close);
    });

    socket.addEventListener('error', (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);

        if (data.type && data.type === 'pong') {
          return;
        }

        this.emit(WSTransportEvents.Message, data);
      } catch (err: any) {
        console.error(err.message);
        Router.go(Routes.ServerError);
      }
    });
  }
}

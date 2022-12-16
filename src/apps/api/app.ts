import { Server } from './server';
import { config } from 'dotenv';

export class Api {
  server?: Server;

  async start() {
    config();
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    return this.server?.stop();
  }
}

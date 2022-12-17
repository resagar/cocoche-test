import { Server } from './server';

export class Api {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    await this.server.connectDataSources();
    await this.server.setCarsToRedis();
    this.server.startJobsCron();
    return this.server.listen();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  async stop() {
    await this.server?.disconnectDataSources();
    return this.server?.stop();
  }
}

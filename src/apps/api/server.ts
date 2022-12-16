import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import httpStatus from 'http-status';
import { Container } from 'typedi';
import { registerRoutes } from './routes';
import { ConnectDb } from '../../Contexts/shared/infrastructure/dataSourcePostgres';
import 'reflect-metadata';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private connect: ConnectDb;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(helmet.xssFilter());
    this.express.use(helmet.noSniff());
    this.express.use(helmet.hidePoweredBy());
    this.express.use(helmet.frameguard({ action: 'deny' }));
    this.express.use(compress());
    this.connect = Container.get<ConnectDb>(ConnectDb);
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    router.use((err: Error, req: Request, res: Response, next: Function) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    try {
      await this.connect.appDataSource.initialize();
      console.log('  Data Source has been initialized!');
    } catch (error) {
      console.error('  Error during Data Source initialization', error);
    }
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`);
        console.log('  Press CTRL-C to stop\n');
        resolve();
      });
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    await this.connect.appDataSource.destroy();
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }
}

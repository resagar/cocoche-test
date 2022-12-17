import 'reflect-metadata';
import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import helmet from 'helmet';
import * as http from 'http';
import { Container } from 'typedi';
import httpStatus from 'http-status';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { registerRoutes } from './routes';
import { ConnectDb } from '../../Contexts/shared/infrastructure/dataSourcePostgres';
import { ConnectRedis } from './../../Contexts/shared/infrastructure/dataSourceRedis';
import { CarsSearchFord } from './../../Contexts/Cars/application/CarsSearchFord';
import { UpdateFordCarsJob } from './cronjobs/UpdateFordCarsJob';
import { Job } from './cronjobs/Job';
import { BaseError } from './errors';

export class Server {
  private express: express.Express;
  private port: string;
  private httpServer?: http.Server;
  private db: ConnectDb;
  private redis: ConnectRedis;
  private carsSearchFord: CarsSearchFord;
  private updateFordCarsJob: Job;

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
    this.db = Container.get<ConnectDb>(ConnectDb);
    this.redis = Container.get<ConnectRedis>(ConnectRedis);
    this.carsSearchFord = Container.get<CarsSearchFord>(CarsSearchFord);
    this.updateFordCarsJob = Container.get<UpdateFordCarsJob>(UpdateFordCarsJob);
    const router = Router();
    if (process.env.NODE_ENV === 'development') {
      router.use(errorHandler());
    }
    this.express.use(router);

    registerRoutes(router);

    router.use((err: BaseError, req: Request, res: Response, next: Function) => {
      console.log(`${err.description} -> ${err?.stack}`);
      res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: err.message });
    });

    const swaggerDocument = YAML.load('swagger.yml');
    router.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  async listen(): Promise<void> {
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
    await this.db.disconnect();
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
  async connectDataSources() {
    try {
      await this.db.connect();
      await this.redis.connect();
      console.log('  Data Source has been initialized!');
    } catch (error) {
      console.error('  Error during Data Source initialization', error);
    }
  }

  async disconnectDataSources() {
    try {
      await this.db.disconnect();
      await this.redis.disconnect();
      console.log('  Data Source disconnect!');
    } catch (error) {
      console.error('  Error during Data Source disconnection', error);
    }
  }

  async setCarsToRedis() {
    try {
      await this.carsSearchFord.searchCars();
      console.log('  Set Ford cars success');
    } catch (error) {
      console.error('  Error in set Ford cars', error);
    }
  }
  startJobsCron() {
    this.updateFordCarsJob.start();
  }
}

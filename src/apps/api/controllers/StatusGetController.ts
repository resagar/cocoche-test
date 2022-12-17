import { Inject, Service } from 'typedi';
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { ConnectDb } from '../../../Contexts/shared/infrastructure/dataSourcePostgres';
import { ConnectRedis } from './../../../Contexts/shared/infrastructure/dataSourceRedis';

@Service()
export default class StatusGetController implements Controller {
  constructor(
    @Inject() private readonly dataSourcePostgres: ConnectDb,
    @Inject() private readonly dataSourceRedis: ConnectRedis
  ) {}
  async run(req: Request, res: Response, next: NextFunction) {
    if (!this.dataSourcePostgres.isConnected()) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Database postgres not initialized');
    }
    if (!this.dataSourceRedis.isConnected()) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Redis not initialized');
    }
    res.status(httpStatus.OK).send();
  }
}

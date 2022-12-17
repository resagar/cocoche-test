import { Inject, Service } from 'typedi';
import { Request, Response } from 'express';
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
  async run(req: Request, res: Response) {
    if (!this.dataSourcePostgres.isConnected()) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('database postgres not initialized');
    }
    if (!this.dataSourceRedis.isConnected()) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('redis not initialized');
    }
    res.status(httpStatus.OK).send();
  }
}

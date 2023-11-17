import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';
import { DataSourcePostgres } from '../../../Contexts/shared/infrastructure/DataSourcePostgres';
import { DataSourceRedis } from '../../../Contexts/shared/infrastructure/DataSourceRedis';

export default class StatusGetController implements Controller {
  constructor(
    private readonly dataSourcePostgres: DataSourcePostgres,
    private readonly dataSourceRedis: DataSourceRedis
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

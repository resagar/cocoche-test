import { RedisClientType, createClient } from 'redis';

export class DataSourceRedis {
  public appDataSource: RedisClientType;

  constructor() {
    this.appDataSource = createClient({
      url: process.env.REDIS_URL
    });
    this.appDataSource.on('error', err => console.log('Redis Client Error', err));
  }

  public isConnected() {
    return this.appDataSource.isReady;
  }

  public async connect() {
    return await this.appDataSource.connect();
  }

  public async disconnect() {
    return await this.appDataSource.disconnect();
  }
}

import 'reflect-metadata';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';

@Service()
export class ConnectDb {
  public appDataSource: DataSource;

  constructor() {
    this.appDataSource = new DataSource({
      type: 'postgres',
      host: `${process.env.DB_HOST}`,
      port: parseInt(<string>process.env.DB_PORT),
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      synchronize: true,
      logging: false,
      entities: [`./entity/**/*.entity.{js,ts}`]
    });
  }

  public isConnected() {
    return this.appDataSource.isInitialized;
  }

  public async connect() {
    return await this.appDataSource.initialize();
  }

  public async disconnect() {
    return await this.appDataSource.destroy();
  }
}

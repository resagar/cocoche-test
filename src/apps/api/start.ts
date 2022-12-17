import { Api } from './app';
import { config } from 'dotenv';

try {
  config();
  new Api().start();
} catch (e) {
  console.log(e);
  process.exit(1);
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err);
  process.exit(1);
});

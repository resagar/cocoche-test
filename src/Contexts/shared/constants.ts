import { ValidationError } from 'express-validator';

export const CARS_FORD_REDIS_KEY = 'list_cars_ford';
export const CRON_TIME_SEARCH_CARS = '* 2 3 * * 1';
export const FORMAT_MESSAGE_VALIDATOR = ({ location, param, msg }: ValidationError) => `${location} [${param}]: ${msg}`;

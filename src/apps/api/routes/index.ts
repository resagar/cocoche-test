import { Router, Request, Response } from 'express';
import httpStatus from 'http-status';
import { validationResult } from 'express-validator';
import glob from 'glob';
import { FORMAT_MESSAGE_VALIDATOR } from '../../../Contexts/shared/constants';

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, router));
}

function register(routePath: string, router: Router) {
  const route = require(routePath);
  route.register(router);
}

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const errors = validationResult(req).formatWith(FORMAT_MESSAGE_VALIDATOR);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(httpStatus.BAD_REQUEST).json({
    errors: errors.array()
  });
}

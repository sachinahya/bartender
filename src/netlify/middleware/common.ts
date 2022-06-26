import { MiddlewareObj, MiddyfiedHandler } from '@middy/core';
import { HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { JwtPayload } from 'jsonwebtoken';
import type { Except } from 'type-fest';

import { DbClient } from '../db/client';

export interface FunctionEvent extends HandlerEvent {
  auth?: JwtPayload;
  dbClient: DbClient;
}

export interface AuthRequiredFunctionEvent extends FunctionEvent {
  auth: JwtPayload;
}

export interface FunctionContext extends HandlerContext {}

export interface FunctionResponse extends Except<HandlerResponse, 'body'> {
  body?: unknown;
}

export type Handler<TEvent extends FunctionEvent = FunctionEvent> = (
  event: TEvent,
  context: FunctionContext,
) => Promise<FunctionResponse>;

export type AuthRequiredHandler = Handler<AuthRequiredFunctionEvent>;

export type Middleware = MiddlewareObj<FunctionEvent, FunctionResponse, Error, FunctionContext>;

export type MiddlewareHandler = MiddyfiedHandler<
  FunctionEvent,
  FunctionResponse,
  Error,
  FunctionContext
>;

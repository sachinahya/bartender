import { MiddlewareObj } from '@middy/core';
import { HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions';
import { JwtPayload } from 'jsonwebtoken';

export interface FunctionEvent extends HandlerEvent {
  auth?: JwtPayload;
}

export interface FunctionContext extends HandlerContext {}

export interface FunctionResponse extends HandlerResponse {}

export type Handler = (event: FunctionEvent, context: FunctionContext) => Promise<FunctionResponse>;

export type Middleware = MiddlewareObj<FunctionEvent, FunctionResponse, Error, FunctionContext>;
